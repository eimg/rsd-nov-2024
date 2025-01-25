const rate = 4005.2;

export function convert(usd) {
    const result = usd * rate;
    return Number(result.toFixed(1));
}
