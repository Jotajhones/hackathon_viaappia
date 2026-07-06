export type IncidentsPrioridade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';

export type IncidentStatus = 'ABERTA' | 'EM_ANDAMENTO' | 'EM_REVISAO' | 'FECHADA';

export interface Incidents {
    id: string;
    titulo: string;
    descricao: string;
    prioridade: IncidentsPrioridade;
    responsavel: string;
    tags: string[];
    dataAbertura: Date;
    dataAtualizacao: Date;
}
