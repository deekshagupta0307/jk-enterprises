import { getServerSession, AuthenticatedUserSession } from './session';
import {
  SystemRole,
  CustomerType,
  BusinessVerificationStatus,
  WholesaleApprovalStatus,
} from '@prisma/client';

export class AuthorizationError extends Error {
  statusCode: number;
  code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'VERIFICATION_REQUIRED';

  constructor(
    message: string,
    code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'VERIFICATION_REQUIRED' = 'FORBIDDEN',
    statusCode: number = 403
  ) {
    super(message);
    this.name = 'AuthorizationError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Enforces that a request has an active, authenticated user session.
 */
export async function requireAuth(): Promise<AuthenticatedUserSession> {
  const session = await getServerSession();
  if (!session) {
    throw new AuthorizationError(
      'Authentication required. Please sign in to access this resource.',
      'UNAUTHENTICATED',
      401
    );
  }
  return session;
}

/**
 * Enforces that the authenticated user possesses an allowed system role (CUSTOMER, STAFF, ADMIN).
 */
export async function requireRole(
  allowedRoles: SystemRole[]
): Promise<AuthenticatedUserSession> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.user.role)) {
    throw new AuthorizationError(
      `Access denied. Role "${session.user.role}" does not have required permissions.`,
      'FORBIDDEN',
      403
    );
  }
  return session;
}

/**
 * Enforces that the authenticated customer profile matches an allowed customer type (RETAIL, BUSINESS, WHOLESALE).
 */
export async function requireCustomerType(
  allowedTypes: CustomerType[]
): Promise<AuthenticatedUserSession> {
  const session = await requireAuth();
  const currentType = session.profile?.customerType || CustomerType.RETAIL;

  // Staff and Admin bypass customer type checks for oversight
  if (session.user.role === SystemRole.ADMIN || session.user.role === SystemRole.STAFF) {
    return session;
  }

  if (!allowedTypes.includes(currentType)) {
    throw new AuthorizationError(
      `Access restricted to ${allowedTypes.join(' / ')} customer profiles.`,
      'FORBIDDEN',
      403
    );
  }
  return session;
}

export type PermittedSupportOperation =
  | 'INQUIRY_SUPPORT'
  | 'PROFORMA_ASSISTANCE'
  | 'TAX_VERIFICATION';

/**
 * Strict Account Ownership Verification:
 * Protects personal customer credentials, session, profile, and account settings.
 * Only the account owner themselves or a full system ADMIN can access personal account data.
 * STAFF role does NOT grant blanket access to another customer's personal account data.
 */
export function verifyAccountOwnership(
  targetUserId: string,
  session: AuthenticatedUserSession
): boolean {
  if (session.user.role === SystemRole.ADMIN) {
    return true;
  }
  if (session.user.id === targetUserId) {
    return true;
  }
  throw new AuthorizationError(
    "Forbidden: Access to another customer's personal account data is prohibited.",
    'FORBIDDEN',
    403
  );
}

/**
 * Scoped Support Operation Authorization:
 * Staff and Admins may access designated operational records (e.g. quotation inquiries,
 * proforma assistance, or GST verification) strictly within permitted support operations.
 * Regular customers may only access their own records.
 */
export function verifySupportAccess(
  targetUserId: string,
  session: AuthenticatedUserSession,
  operation: PermittedSupportOperation
): boolean {
  if (session.user.role === SystemRole.ADMIN) {
    return true;
  }
  if (session.user.role === SystemRole.STAFF) {
    const permittedOperations: PermittedSupportOperation[] = [
      'INQUIRY_SUPPORT',
      'PROFORMA_ASSISTANCE',
      'TAX_VERIFICATION',
    ];
    if (permittedOperations.includes(operation)) {
      return true;
    }
  }
  if (session.user.id === targetUserId) {
    return true;
  }
  throw new AuthorizationError(
    `Forbidden: You do not have permission for support operation "${operation}" on this record.`,
    'FORBIDDEN',
    403
  );
}

/**
 * Legacy wrapper: Scopes staff access specifically to INQUIRY_SUPPORT instead of granting blanket bypass.
 * Prevents horizontal privilege escalation across personal customer records.
 */
export function verifyOwnershipOrStaff(
  targetUserId: string,
  session: AuthenticatedUserSession
): boolean {
  return verifySupportAccess(targetUserId, session, 'INQUIRY_SUPPORT');
}

/**
 * Policy: Determines whether the caller is authorized to view or receive confirmed wholesale pricing.
 * Strict: Requires an explicit APPROVED wholesale profile.
 * Neither role alone nor pending/unverified status grants wholesale pricing.
 */
export function canAccessWholesalePricing(
  session: AuthenticatedUserSession | null
): boolean {
  if (!session || !session.profile) return false;
  return (
    session.profile.customerType === CustomerType.WHOLESALE &&
    session.profile.wholesaleApprovalStatus === WholesaleApprovalStatus.APPROVED
  );
}

/**
 * Policy: Determines whether caller has business portal features (bulk inquiries, proforma requests).
 */
export function canAccessBusinessFeatures(
  session: AuthenticatedUserSession | null
): boolean {
  if (!session) return false;
  if (session.user.role === SystemRole.ADMIN || session.user.role === SystemRole.STAFF) {
    return true;
  }
  return (
    session.profile?.customerType === CustomerType.BUSINESS ||
    session.profile?.customerType === CustomerType.WHOLESALE
  );
}

/**
 * Policy: Determines whether caller can view verified business tax/GST invoice management.
 * Requires explicit VERIFIED status.
 */
export function canAccessVerifiedBusinessInvoicing(
  session: AuthenticatedUserSession | null
): boolean {
  if (!session) return false;
  if (session.user.role === SystemRole.ADMIN || session.user.role === SystemRole.STAFF) {
    return true;
  }
  return (
    session.profile?.businessVerificationStatus === BusinessVerificationStatus.VERIFIED
  );
}

/**
 * Policy: Determines whether caller can approve wholesale partner applications.
 * Restricted exclusively to ADMIN.
 */
export function canApproveWholesale(session: AuthenticatedUserSession): boolean {
  return session.user.role === SystemRole.ADMIN;
}

/**
 * Policy: Determines whether caller can verify business tax credentials.
 * Restricted to STAFF and ADMIN.
 */
export function canVerifyBusiness(session: AuthenticatedUserSession): boolean {
  return session.user.role === SystemRole.ADMIN || session.user.role === SystemRole.STAFF;
}
