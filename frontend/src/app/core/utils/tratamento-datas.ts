import { formatDate } from "@angular/common";


export function converterData(dataOriginal: Date): string {
    dataOriginal = new Date();
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

    if (minutos < 1) {
        return 'agora';
    }
    if (minutos < 60) {
        return `${minutos}m`;
    }
    if (horas < 24) {
        return `${horas}h`;
    }
    return `${dias} dias`;
}