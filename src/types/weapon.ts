export interface Weapon {
  _id: { $oid: string };
  serial: string;
  name: string;
  type: string;
  image: string;
  price: string;
  qualities?: string[];
  description: string;
  stats: {
    damage: number;
    accuracy: number;
    fireRate: number;
    mobility: number;
    range: number;
  };
  attachments: string[];
}
