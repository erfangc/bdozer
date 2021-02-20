import { Item, Driver, Model } from "../../../client";

export interface DriverProps {
  item: Item;
  driver: Driver;
  model: Model;
  onChange: (newModel: Model) => void;
  onEdit: () => void;
}
