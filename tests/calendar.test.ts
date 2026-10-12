import {describe,it,expect} from "vitest";
import {addBusinessDays,civil,countBusinessDays,daysInMonth,federalHolidays,ics,isoWeek,isLeapYear,monthGrid,retail445} from "../src/lib/calendar";
describe("Gregorian civil dates",()=>{
 it("handles Gregorian leap-year exceptions",()=>{expect(isLeapYear(2024)).toBe(true);expect(isLeapYear(2100)).toBe(false);expect(isLeapYear(2000)).toBe(true);expect(daysInMonth(2100,2)).toBe(28);});
 it("rejects invalid civil dates and preserves years below 100",()=>{expect(()=>civil("2100-02-29")).toThrow();expect(()=>civil("2026-13-01")).toThrow();expect(monthGrid(40,2)[0].date).toMatch(/^0040-/);});
 it("keeps ISO week-year boundaries correct",()=>{expect(isoWeek(civil("2026-12-31"))).toEqual({week:53,year:2026});expect(isoWeek(civil("2027-01-01"))).toEqual({week:53,year:2026});});
 it("aligns Monday and Sunday grids and supports six rows",()=>{expect(monthGrid(2026,10,1)[0].date).toBe("2026-09-28");expect(monthGrid(2026,10,0)[0].date).toBe("2026-09-27");expect(monthGrid(2026,2,1,true)).toHaveLength(42);});
});
describe("Business dates",()=>{
 it("counts inclusive weekdays and skips supplied holidays",()=>{expect(countBusinessDays(civil("2026-01-01"),civil("2026-01-07"),[civil("2026-01-01")])).toBe(4);});
 it("adds and subtracts business days over weekends",()=>{expect(addBusinessDays(civil("2026-01-02"),1)).toBe("2026-01-05");expect(addBusinessDays(civil("2026-01-05"),-1)).toBe("2026-01-02");});
 it("generates 11 observed US federal holidays, including cross-year observance",()=>{expect(federalHolidays(2026).size).toBe(11);expect(federalHolidays(2026).has(civil("2026-07-03"))).toBe(true);expect(federalHolidays(2021).get(civil("2021-12-31"))).toBe("New Year's Day");});
});
describe("Retail periods and exports",()=>{
 it("produces nearest-Sunday 4-4-5 periods with 52 or 53 weeks",()=>{expect(retail445(2024)[0].start).toBe("2024-02-04");for(const y of [2025,2026,2027]){const p=retail445(y);expect(p).toHaveLength(12);expect(p.reduce((a,x)=>a+x.weeks,0)).toBeGreaterThanOrEqual(52);}});
 it("escapes ICS summary fields and emits date-only events",()=>{const out=ics([{date:civil("2026-07-04"),title:"Party, work; end"}]);expect(out).toContain("DTSTART;VALUE=DATE:20260704");expect(out).toContain("SUMMARY:Party\\, work\\; end");});
});
