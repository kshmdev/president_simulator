import React from 'react';

interface RegionState {
  name: string;
  approval: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface WorldMapProps {
  regions: Record<string, RegionState>;
}

const WorldMap: React.FC<WorldMapProps> = ({ regions }) => {
  const getRegionColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'fill-victory/60 hover:fill-victory/80';
      case 'negative':
        return 'fill-destructive/60 hover:fill-destructive/80';
      default:
        return 'fill-muted/60 hover:fill-muted/80';
    }
  };

  const getRegionStroke = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'stroke-victory';
      case 'negative':
        return 'stroke-destructive';
      default:
        return 'stroke-muted-foreground/50';
    }
  };

  return (
    <div className="card-glass rounded-xl p-6">
      <h3 className="headline-display text-lg text-foreground mb-4 flex items-center gap-2">
        <span>🌍</span> World Impact Map
      </h3>
      
      <div className="relative w-full aspect-[2/1] bg-muted/20 rounded-lg overflow-hidden">
        {/* Simplified world map SVG */}
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* North America */}
          <path
            d="M150,100 L280,80 L320,120 L300,180 L250,220 L200,200 L150,180 Z"
            className={`${getRegionColor(regions['north_america']?.sentiment || 'neutral')} ${getRegionStroke(regions['north_america']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['north_america']?.name || 'North America'}: {regions['north_america']?.approval || 50}% Approval</title>
          </path>
          
          {/* South America */}
          <path
            d="M250,250 L300,240 L320,300 L300,380 L260,400 L230,350 L240,280 Z"
            className={`${getRegionColor(regions['south_america']?.sentiment || 'neutral')} ${getRegionStroke(regions['south_america']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['south_america']?.name || 'South America'}: {regions['south_america']?.approval || 50}% Approval</title>
          </path>
          
          {/* Europe */}
          <path
            d="M450,80 L520,70 L550,100 L540,150 L500,160 L460,140 L450,100 Z"
            className={`${getRegionColor(regions['europe']?.sentiment || 'neutral')} ${getRegionStroke(regions['europe']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['europe']?.name || 'Europe'}: {regions['europe']?.approval || 50}% Approval</title>
          </path>
          
          {/* Africa */}
          <path
            d="M480,180 L550,170 L580,220 L570,320 L520,360 L470,340 L460,260 L470,200 Z"
            className={`${getRegionColor(regions['africa']?.sentiment || 'neutral')} ${getRegionStroke(regions['africa']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['africa']?.name || 'Africa'}: {regions['africa']?.approval || 50}% Approval</title>
          </path>
          
          {/* Asia */}
          <path
            d="M580,60 L750,50 L820,120 L800,200 L700,220 L620,180 L580,120 Z"
            className={`${getRegionColor(regions['asia']?.sentiment || 'neutral')} ${getRegionStroke(regions['asia']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['asia']?.name || 'Asia'}: {regions['asia']?.approval || 50}% Approval</title>
          </path>
          
          {/* Middle East */}
          <path
            d="M560,150 L620,140 L640,180 L620,220 L570,210 L550,180 Z"
            className={`${getRegionColor(regions['middle_east']?.sentiment || 'neutral')} ${getRegionStroke(regions['middle_east']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['middle_east']?.name || 'Middle East'}: {regions['middle_east']?.approval || 50}% Approval</title>
          </path>
          
          {/* Australia */}
          <path
            d="M780,300 L860,290 L880,340 L850,380 L790,370 L770,330 Z"
            className={`${getRegionColor(regions['oceania']?.sentiment || 'neutral')} ${getRegionStroke(regions['oceania']?.sentiment || 'neutral')} stroke-2 transition-all cursor-pointer`}
          >
            <title>{regions['oceania']?.name || 'Oceania'}: {regions['oceania']?.approval || 50}% Approval</title>
          </path>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-victory/60"></div>
            <span className="text-muted-foreground">Favorable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-muted/60"></div>
            <span className="text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-destructive/60"></div>
            <span className="text-muted-foreground">Unfavorable</span>
          </div>
        </div>
      </div>

      {/* Region details */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(regions).map(([key, region]) => (
          <div key={key} className="p-2 bg-muted/30 rounded-lg text-xs">
            <p className="font-semibold text-foreground">{region.name}</p>
            <p className={`${region.sentiment === 'positive' ? 'text-victory' : region.sentiment === 'negative' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {region.approval}% approval
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
