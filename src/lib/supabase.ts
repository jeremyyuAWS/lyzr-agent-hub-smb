import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'marketing' | 'customer-service' | 'hr' | 'finance';
  tags: string[];
  demo_url: string | null;
  status: 'live' | 'coming_soon' | 'optional';
  created_at: string;
  updated_at: string;
}

export const agentsApi = {
  async getAllAgents(): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents_showcase')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
    
    return data || [];
  },

  async getAgentsByCategory(category: string): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents_showcase')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) {
      console.error('Error fetching agents by category:', error);
      return [];
    }
    
    return data || [];
  },

  async createAgent(agent: Omit<Agent, 'id' | 'created_at' | 'updated_at'>): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents_showcase')
      .insert([agent])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating agent:', error);
      return null;
    }
    
    return data;
  },

  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
    const { data, error } = await supabase
      .from('agents_showcase')
      .update(updates)
      .select()
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error updating agent:', error);
      return null;
    }
    
    return data;
  },

  async deleteAgent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('agents_showcase')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting agent:', error);
      return false;
    }
    
    return true;
  }
};