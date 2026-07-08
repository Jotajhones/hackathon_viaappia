export function capitalize(palavra: string): string {
    if (!palavra) return palavra;

    const resultado = palavra
        .toLowerCase()
        .split('_').join(' ')    
        .trim();     
              
    return resultado.charAt(0).toUpperCase() + resultado.slice(1);
}