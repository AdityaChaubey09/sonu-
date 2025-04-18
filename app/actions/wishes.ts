"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export type Wish = {
  id: number
  name: string
  relation: string
  message: string
  timestamp: string
  created_at?: string
}

export async function getWishes(): Promise<Wish[]> {
  try {
    const { data, error } = await supabase.from("wishes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching wishes:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching wishes:", error)
    return []
  }
}

export async function addWish(wish: Omit<Wish, "id" | "created_at">): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("wishes").insert([wish])

    if (error) {
      console.error("Error adding wish:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/wishes")
    return { success: true }
  } catch (error) {
    console.error("Error adding wish:", error)
    return { success: false, error: "Failed to add wish" }
  }
}

export async function deleteWish(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("wishes").delete().eq("id", id)

    if (error) {
      console.error("Error deleting wish:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/wishes")
    return { success: true }
  } catch (error) {
    console.error("Error deleting wish:", error)
    return { success: false, error: "Failed to delete wish" }
  }
}
