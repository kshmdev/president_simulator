import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GameState, Policy } from '@/types/game';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface GameSave {
  id: string;
  user_id: string;
  player_name: string;
  game_phase: string;
  approval_rating: number;
  campaign_funds: number;
  selected_policies: Policy[];
  debate_score: number;
  election_result: string | null;
  days_in_office: number;
  events_completed: string[];
  current_event_id: string | null;
  world_state: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export const useGameSave = () => {
  const { user } = useAuth();

  const saveGame = useCallback(async (gameState: GameState, worldState: Record<string, unknown> = {}) => {
    if (!user) {
      toast.error('You must be logged in to save your game');
      return null;
    }

    try {
      // Check for existing save
      const { data: existingSave } = await supabase
        .from('game_saves')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const saveData = {
        user_id: user.id,
        player_name: gameState.playerName,
        game_phase: gameState.phase,
        approval_rating: gameState.approvalRating,
        campaign_funds: gameState.campaignFunds,
        selected_policies: gameState.selectedPolicies as unknown as Json,
        debate_score: gameState.debateScore,
        election_result: gameState.electionResult || null,
        days_in_office: gameState.daysInOffice,
        events_completed: gameState.eventsCompleted,
        current_event_id: gameState.currentEventId || null,
        world_state: worldState as Json,
      };

      if (existingSave) {
        const { error } = await supabase
          .from('game_saves')
          .update(saveData)
          .eq('id', existingSave.id);

        if (error) throw error;
        toast.success('Game saved!');
        return existingSave.id;
      } else {
        const { data, error } = await supabase
          .from('game_saves')
          .insert(saveData)
          .select('id')
          .single();

        if (error) throw error;
        toast.success('Game saved!');
        return data.id;
      }
    } catch (error) {
      console.error('Error saving game:', error);
      toast.error('Failed to save game');
      return null;
    }
  }, [user]);

  const loadGame = useCallback(async (): Promise<GameSave | null> => {
    if (!user) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('game_saves')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        return {
          ...data,
          selected_policies: data.selected_policies as unknown as Policy[],
          world_state: data.world_state as Record<string, unknown>,
        } as GameSave;
      }
      return null;
    } catch (error) {
      console.error('Error loading game:', error);
      return null;
    }
  }, [user]);

  const deleteGame = useCallback(async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('game_saves')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Save deleted');
      return true;
    } catch (error) {
      console.error('Error deleting save:', error);
      toast.error('Failed to delete save');
      return false;
    }
  }, [user]);

  return { saveGame, loadGame, deleteGame };
};
