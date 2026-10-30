// Convert English digits to Bengali digits
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

// Format price with commas and Bengali digits, ignoring the negative sign
export function formatPrice(price: number): string {
  return toBengaliNumber(Math.abs(price).toLocaleString("en-IN"));
}

// 3. Convert units to Bengali
export function getUnitBn(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    gram: "প্রতি গ্রাম",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    ml: "প্রতি মিলিলিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    maund: "প্রতি মণ",
    packet: "প্রতি প্যাকেট",
    bag: "প্রতি বস্তা",
  };
  return units[unit.toLowerCase()] ?? unit;
}

// 4. Get today's date in Bengali
export function getBanglaDate(): string {
  const date = new Date();

  const bengaliDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const bengaliMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const day = bengaliDays[date.getDay()];
  const dateOfMonth = toBengaliNumber(date.getDate());
  const month = bengaliMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  return `${day}, ${dateOfMonth} ${month}, ${year}`;
}
