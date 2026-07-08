export type IncidentsPrioridade = 'BAIXA' | 'MEDIA' | 'ALTA';

export type IncidentStatus = 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA' | 'CANCELADA';

export interface Incidents {
    id: string;
    titulo: string;
    descricao: string;
    status: IncidentStatus;
    prioridade: IncidentsPrioridade;
    responsavel: string;
    tags: string[];
    dataAbertura: Date;
    dataAtualizacao: Date;
}
