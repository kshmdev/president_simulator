-- Create game_saves table to store player game progress
CREATE TABLE public.game_saves (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  player_name TEXT NOT NULL,
  game_phase TEXT NOT NULL DEFAULT 'title',
  approval_rating INTEGER NOT NULL DEFAULT 50,
  campaign_funds INTEGER NOT NULL DEFAULT 100000,
  selected_policies JSONB NOT NULL DEFAULT '[]'::jsonb,
  debate_score INTEGER NOT NULL DEFAULT 0,
  election_result TEXT,
  days_in_office INTEGER NOT NULL DEFAULT 0,
  events_completed TEXT[] NOT NULL DEFAULT '{}',
  current_event_id TEXT,
  world_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_saves ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own game saves" 
ON public.game_saves 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own game saves" 
ON public.game_saves 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game saves" 
ON public.game_saves 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own game saves" 
ON public.game_saves 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_game_saves_updated_at
BEFORE UPDATE ON public.game_saves
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();