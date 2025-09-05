import { describe, expect, it } from "vitest";
import { CredenciaisApiSchema } from "../../../src/api/credenciais-api";

describe("CredenciaisApiSchema", () => {
  it("should validate correct credentials", () => {
    const data = {
      chave: "f39c5859-3609-4ebe-a764-1109b26c28aa",
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(true);
  });


  it("should fail if chave is missing", () => {
    const data = {
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should set default url if not provided", () => {
    const data = {
      chave: "f39c5859-3609-4ebe-a764-1109b26c28aa",
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(true);
    expect(result.data!.url).toBe("https://web.qualityautomacao.com.br");
  });

  it("should fail if url is not a valid URL", () => {
    const data = {
      chave: "f39c5859-3609-4ebe-a764-1109b26c28aa",
      url: "not-a-valid-url"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if chave is not a string", () => {
    const data = {
      chave: 12345,
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});