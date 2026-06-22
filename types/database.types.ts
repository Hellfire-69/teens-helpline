export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          last_active: string
        }
        Insert: {
          id: string
          created_at?: string
          last_active?: string
        }
        Update: {
          id?: string
          created_at?: string
          last_active?: string
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          id: string
          space_id: string
          date: string
          mood: string
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          space_id: string
          date: string
          mood: string
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          space_id?: string
          date?: string
          mood?: string
          note?: string | null
          created_at?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          id: string
          space_id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          space_id: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          space_id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      nova_conversations: {
        Row: {
          id: string
          space_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          space_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          space_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      nova_messages: {
        Row: {
          id: string
          conversation_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: string
          content?: string
          created_at?: string
        }
        Relationships: []
      }
      saved_articles: {
        Row: {
          id: string
          space_id: string
          slug: string
          saved_at: string
        }
        Insert: {
          id?: string
          space_id: string
          slug: string
          saved_at?: string
        }
        Update: {
          id?: string
          space_id?: string
          slug?: string
          saved_at?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          space_id: string
          theme: string
          reduced_motion: boolean
          notifications_enabled: boolean
          updated_at: string
        }
        Insert: {
          space_id: string
          theme?: string
          reduced_motion?: boolean
          notifications_enabled?: boolean
          updated_at?: string
        }
        Update: {
          space_id?: string
          theme?: string
          reduced_motion?: boolean
          notifications_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
