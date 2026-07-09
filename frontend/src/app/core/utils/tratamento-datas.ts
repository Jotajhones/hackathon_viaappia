import { formatDate } from "@angular/common";


export function converterData(dataOriginal: Date): string {
    const formato = 'yyyy-MM-ddTHH:mm';
    const locale = 'en-US';
    const dataFormatada = formatDate(dataOriginal, formato, locale);
    return (dataFormatada);
}

export function formatarTempoDecorrido(dataString: Date | string | null): string {
    if (!dataString) return '';

    const dataPassada = new Date(dataString).getTime();
    const agora = new Date().getTime();

    const diferenca = agora - dataPassada;

    if (diferenca < 0) return 'agora';

    const segundos = Math.floor(diferenca / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(dias / 365);

    if (minutos < 1) {
        return 'agora';
    }
    if (minutos < 60) {
        return `${minutos}m`;
    }
    if (horas < 24) {
        return `${horas}h`;
    }
    if (dias < 30) {
        return `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }
    if (meses < 12) {
        return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    }
    
    return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
}