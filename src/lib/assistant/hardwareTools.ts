import { getCatalogueProducts, CatalogueProductView } from '@/lib/catalogue/catalogueService';

export interface SearchProductsInput {
  query: string;
  category?: string;
  maxPrice?: number;
  limit?: number;
}

export interface CompatibilityCheckInput {
  cpuSku: string;
  motherboardSocket?: string;
  ramType?: 'DDR4' | 'DDR5' | string;
}

export interface CompatibilityCheckResult {
  isCompatible: boolean;
  hasUncertainty: boolean;
  cpuFound: boolean;
  cpuName?: string;
  cpuSocket?: string;
  cpuSupportedMemory?: string;
  checkedAgainst: {
    motherboardSocket?: string;
    ramType?: string;
  };
  reasons: string[];
  caveats: string[];
  isDemoData: boolean;
}

export interface QuotationItemInput {
  sku: string;
  quantity: number;
}

export interface QuotationEstimateResult {
  items: Array<{
    sku: string;
    name: string;
    unitPriceINR: number;
    quantity: number;
    totalINR: number;
    isDemoPrice: boolean;
  }>;
  subtotalINR: number;
  estimatedTaxNote: string;
  estimatedTotalINR: number;
  isConfirmedQuotation: false;
  disclaimer: string;
}

/**
 * Validated server-side hardware search for future AI tool calling.
 * Read-only access, safe sanitization, zero arbitrary SQL.
 */
export async function searchProducts(
  input: SearchProductsInput
): Promise<{ products: CatalogueProductView[]; totalCount: number; isDemoData: boolean }> {
  // Sanitize input
  const cleanQuery = typeof input.query === 'string' ? input.query.trim().slice(0, 100) : '';
  const cleanCategory = typeof input.category === 'string' ? input.category.trim() : undefined;
  const cleanMaxPrice =
    typeof input.maxPrice === 'number' && !isNaN(input.maxPrice) && input.maxPrice > 0
      ? input.maxPrice
      : undefined;
  const cleanLimit = Math.min(20, Math.max(1, Number(input.limit) || 5));

  const result = await getCatalogueProducts({
    q: cleanQuery,
    category: cleanCategory,
    maxPrice: cleanMaxPrice,
    limit: cleanLimit,
  });

  return {
    products: result.products,
    totalCount: result.totalCount,
    isDemoData: !result.isDatabaseConnected || result.products.some((p) => p.isDemo),
  };
}

/**
 * Rigorous hardware specification compatibility checker.
 * Compares verified CPU socket standards and RAM physical architecture.
 * Explicitly surfaces uncertainty if required specifications are missing.
 */
export async function checkCompatibility(
  input: CompatibilityCheckInput
): Promise<CompatibilityCheckResult> {
  const result: CompatibilityCheckResult = {
    isCompatible: true,
    hasUncertainty: false,
    cpuFound: false,
    checkedAgainst: {
      motherboardSocket: input.motherboardSocket,
      ramType: input.ramType,
    },
    reasons: [],
    caveats: [
      'Compatibility result is based on catalogue specification attributes.',
      'Always verify motherboard manufacturer QVL (Qualified Vendor List) before final procurement.',
    ],
    isDemoData: true,
  };

  const searchRes = await getCatalogueProducts({ q: input.cpuSku, limit: 1 });
  const cpu = searchRes.products[0];

  if (!cpu) {
    result.isCompatible = false;
    result.hasUncertainty = true;
    result.reasons.push(`CPU with SKU "${input.cpuSku}" was not found in the catalogue.`);
    result.caveats.push('Uncertainty: Cannot verify compatibility because the CPU was not found.');
    return result;
  }

  result.cpuFound = true;
  result.cpuName = cpu.name;

  const socketSpec = cpu.specifications.find((s) => s.key === 'Socket')?.value;
  const memorySpec = cpu.specifications.find((s) => s.key === 'Memory Type')?.value;

  result.cpuSocket = socketSpec;
  result.cpuSupportedMemory = memorySpec;

  // If no comparison parameters were supplied
  if (!input.motherboardSocket && !input.ramType) {
    result.hasUncertainty = true;
    result.isCompatible = false;
    result.reasons.push(
      'Indeterminate: Neither motherboard socket nor RAM type was provided to check against CPU.'
    );
    result.caveats.push(
      'Uncertainty: Without motherboard socket or RAM type parameters, physical and electrical compatibility cannot be confirmed.'
    );
    return result;
  }

  // Check Motherboard Socket
  if (input.motherboardSocket) {
    if (!socketSpec) {
      result.hasUncertainty = true;
      result.isCompatible = false;
      result.reasons.push(
        `Socket Specification Missing: Catalogue record for "${cpu.name}" does not list a Socket specification attribute.`
      );
      result.caveats.push(
        `Uncertainty: Cannot verify motherboard socket "${input.motherboardSocket}" without CPU socket specification in catalogue.`
      );
    } else {
      const normCpuSocket = socketSpec.toLowerCase().replace(/\s+/g, '');
      const normMbSocket = input.motherboardSocket.toLowerCase().replace(/\s+/g, '');

      if (normCpuSocket !== normMbSocket) {
        result.isCompatible = false;
        result.reasons.push(
          `Socket Mismatch: CPU requires ${socketSpec}, but specified motherboard has ${input.motherboardSocket}. They cannot be physically installed together.`
        );
      } else {
        result.reasons.push(`Socket Match: CPU and motherboard both use ${socketSpec}.`);
      }
    }
  }

  // Check RAM Type
  if (input.ramType) {
    if (!memorySpec) {
      result.hasUncertainty = true;
      result.isCompatible = false;
      result.reasons.push(
        `Memory Specification Missing: Catalogue record for "${cpu.name}" does not list a Memory Type specification attribute.`
      );
      result.caveats.push(
        `Uncertainty: Cannot verify RAM standard "${input.ramType}" without CPU memory specification in catalogue.`
      );
    } else {
      const normRam = input.ramType.toUpperCase();
      const normSupported = memorySpec.toUpperCase();

      if (!normSupported.includes(normRam)) {
        result.isCompatible = false;
        result.reasons.push(
          `Memory Standard Mismatch: CPU platform supports ${memorySpec}, but ${input.ramType} was requested. DDR4 and DDR5 have different pin keys and voltages.`
        );
      } else {
        result.reasons.push(`Memory Standard Supported: CPU platform supports ${input.ramType}.`);
      }
    }
  }

  return result;
}

/**
 * Prepares a structured quotation estimate for a list of items.
 * Enforces demo price tagging and explicit unconfirmed status.
 */
export async function calculateQuotationEstimate(
  input: { items: QuotationItemInput[] } | QuotationItemInput[]
): Promise<QuotationEstimateResult> {
  const rawItems = Array.isArray(input) ? input : (input?.items || []);
  const lineItems = [];
  let subtotal = 0;

  for (const item of rawItems) {
    const sanitizedQty = Math.max(1, Math.min(1000, Math.floor(Number(item.quantity) || 1)));
    const searchRes = await getCatalogueProducts({ q: item.sku, limit: 1 });
    const product = searchRes.products[0];

    const unitPrice = product ? product.demoPriceINR : 0;
    const itemTotal = unitPrice * sanitizedQty;
    subtotal += itemTotal;

    lineItems.push({
      sku: item.sku,
      name: product ? product.name : `Uncatalogued Hardware (${item.sku})`,
      unitPriceINR: unitPrice,
      quantity: sanitizedQty,
      totalINR: itemTotal,
      isDemoPrice: true,
    });
  }

  return {
    items: lineItems,
    subtotalINR: subtotal,
    estimatedTaxNote:
      'Commercial tax invoices with applicable GST will be determined during formal B2B sales verification.',
    estimatedTotalINR: subtotal,
    isConfirmedQuotation: false,
    disclaimer:
      'This calculation is an illustrative preview estimate based on sample catalogue pricing. It does not constitute a legally binding offer or invoice.',
  };
}
