export interface AuditLogReasonHeaders {
  "X-Audit-Log-Reason"?: string;
}

export function AuditLogReasonHeaders(reason?: string) {
  if (reason) return { "X-Audit-Log-Reason": reason } as AuditLogReasonHeaders;
  return {};
}
