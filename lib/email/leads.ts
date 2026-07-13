// Email leads organized by category for targeted outreach
// Each lead has name, email, business info, and which sequence to use

export type Lead = {
  name: string;
  email: string;
  businessName: string;
  category: "law-firm" | "dentist" | "plumber" | "saas" | "other";
  city?: string;
  state?: string;
  website?: string;
  sequence: "local-business-seo" | "indie-hacker-partnership";
  priority: "high" | "medium" | "low";
};

// Cleaned and deduplicated leads from the CSV data
export const leads: Lead[] = [
  // === HIGH PRIORITY: Already engaged or hot leads ===
  {
    name: "Keegan Fonte",
    email: "keegan@saasdummies.com",
    businessName: "SaaS Dummies",
    category: "saas",
    website: "https://saasdummies.com",
    sequence: "indie-hacker-partnership",
    priority: "high",
  },
  {
    name: "Khashayar",
    email: "k.mansourizadeh@starnustech.com",
    businessName: "Starnus",
    category: "saas",
    website: "https://starnustech.com",
    sequence: "indie-hacker-partnership",
    priority: "high",
  },
  // === LAW FIRMS ===
  { name: "", email: "info@lemonlaw.com", businessName: "Lemon Law Experts", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@nolemon.com", businessName: "No Lemon Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@unitedlaw.com", businessName: "United Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@pacificattorneygroup.com", businessName: "Pacific Attorney Group", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "Chris", email: "chris@thecbslaw.com", businessName: "CBS Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@knightlaw.com", businessName: "Knight Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "Eben", email: "eben@eyebytes.com", businessName: "US Attorney", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "managements@theattorneygroup.com", businessName: "The Attorney Group", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "customercare@theattorneygroup.com", businessName: "The Attorney Group", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@ariellawgroup.com", businessName: "Ariel Law Group", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "whiteglove@topdoglaw.com", businessName: "Top Dog Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "intake@topdoglaw.com", businessName: "Top Dog Law", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "familylawattorneyla@gmail.com", businessName: "Family Law Attorney", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@mylawcompany.com", businessName: "My Law Company", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "Nick", email: "nick@mylawcompany.com", businessName: "My Law Company", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@theleelegal.net", businessName: "Lee Legal Group", category: "law-firm", city: "Los Angeles", sequence: "local-business-seo", priority: "medium" },
  // === DENTISTS ===
  { name: "", email: "info@centredent.com", businessName: "Centre Dent", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@pearldentalnyc.com", businessName: "Pearl Dental NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@villagedentalnyc.com", businessName: "Village Dental NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@rockcenterdental.com", businessName: "Rock Center Dental", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "manager@tribecadentalny.com", businessName: "Tribeca Dental", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@skydentalnyc.com", businessName: "Sky Dental NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@dentistonmadison.com", businessName: "Dentist on Madison", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "sounddentalnyc@gmail.com", businessName: "Sound Dental NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@nycdentalimplantscenter.com", businessName: "NYC Dental Implants", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "care@makingyousmile.nyc", businessName: "Making You Smile NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "patientcare@212dentalcare.com", businessName: "212 Dental Care", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@80walldental.com", businessName: "Fidi Dental NYC", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "nycmidtown@outlook.com", businessName: "NY Midtown Dental", category: "dentist", city: "New York", sequence: "local-business-seo", priority: "medium" },
  // === PLUMBERS ===
  { name: "", email: "info@firstchicagoplumbing.com", businessName: "First Chicago Plumbing", category: "plumber", city: "Chicago", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "unitedsewer5@gmail.com", businessName: "Sewer United", category: "plumber", city: "Chicago", sequence: "local-business-seo", priority: "medium" },
  { name: "", email: "info@plumbingdept.com", businessName: "Plumbing Dept", category: "plumber", city: "Chicago", sequence: "local-business-seo", priority: "medium" },
  // === OTHERS (general small business) ===
  { name: "", email: "info@luxerxnyc.com", businessName: "Luxe RX NYC", category: "other", city: "New York", sequence: "local-business-seo", priority: "low" },
];

export function getLeadsBySequence(seq: string): Lead[] {
  return leads.filter(l => l.sequence === seq && l.email.includes("@"));
}

export function getLeadsByPriority(priority: string): Lead[] {
  return leads.filter(l => l.priority === priority && l.email.includes("@"));
}
