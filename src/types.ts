export interface WidgetPart {
  id: string;
  name: string;
  partNumber: string;
  nominalSpecs: string;
  actualFlaw: string;
  toleranceDelta: string;
  category: 'flange' | 'bracket' | 'fastener' | 'bearing' | 'thermal' | 'hydraulic';
  description: string;
  price: string;
  renderType: '5bolt-flange' | 'crooked-bracket' | 'seven-sided-nut' | 'wobbly-bearing' | 'slanted-heatsink' | 'stripped-screw' | 'leaky-coupler' | 'oval-washer';
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  quote: string;
  bio: string;
  compassDrift: string;
  yearsWithoutCalibrating: number;
}

export interface DomainListing {
  url: string;
  displayName: string;
  tld: string;
  tagline: string;
  highlight?: boolean;
}

export interface Error404Screen {
  code: string;
  title: string;
  reason: string;
  coolantSpillLevel: string;
  advice: string;
}
