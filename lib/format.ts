const euro = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });

export const formatPrice = (value: number) => euro.format(value);