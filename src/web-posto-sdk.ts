import { Credenciais } from "./api/credenciais-api";
import { WebPostoApi } from "./api/web-posto-api.service";
import { EmpresaService, FuncionarioService, TituloReceberService, VendasService } from "./services";

export class WebPostoSDK {
  private readonly tituloReceberService: TituloReceberService;
  private readonly empresaService: EmpresaService;
  private readonly funcionarioService: FuncionarioService;
  private readonly vendasService: VendasService;


  constructor(credenciais: Credenciais) {
    const api = new WebPostoApi(credenciais);
    this.tituloReceberService = new TituloReceberService(api);
    this.empresaService = new EmpresaService(api);
    this.funcionarioService = new FuncionarioService(api);
    this.vendasService = new VendasService(api);
  }

  public get titulo() {
    return this.tituloReceberService;
  }

  public get empresa() {
    return this.empresaService;
  }

  public get funcionario() {
    return this.funcionarioService;
  }

  public get vendas() {
    return this.vendasService;
  }

}
