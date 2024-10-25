"use server";

import { FilterValues } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { lessons } from "@/db/schema";

export async function getLessons(
  filters: FilterValues,
  pagination: { page: number; amount: number }
) {
  const { character, opponent, notes, timestamped } = filters;
  const { page, amount } = pagination;
  console.log(page, amount);
  // console.log("requesting on drizzle");
  // const res = await db.select().from(lessons).limit(20);
  // console.log("this is from drizzle", res);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const selectQuery = user ? `*, "Bookmarked Lessons(userId, lessonId)"` : `*`;
  let query = supabase
    .from("Lessons")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range((page - 1) * amount, (page - 1) * amount + amount);
  if (character) {
    query = query.eq("character", character);
  }
  if (opponent) {
    query = query.eq("opponent", opponent as string);
  }
  if (notes) {
    query = query.eq("notes", notes as string);
  }
  if (timestamped) {
    query = query.eq("timestamped", true);
  }

  const { data, count, error } = await query;

  console.log("Got", count, "results for filters", filters);
  if (!error) {
    return {
      data,
      count,
      totalPages: Math.ceil((count as number) / amount),
    };
  } else {
    console.log(error);
    throw new Error(error.message);
  }
}
