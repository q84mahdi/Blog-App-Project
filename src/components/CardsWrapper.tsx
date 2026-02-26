import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { JSX } from "react";

interface CardType {
  title: string;
  value: string | number;
  icon: JSX.Element;
}

interface CardsWrapperProps {
  cards: CardType[];
}

async function CardsWrapper({ cards }: CardsWrapperProps) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl bg-secondary-200 p-2 shadow-sm">
          <div className="flex items-center gap-2 p-4 text-secondary-600">
            {card.icon}

            <h3 className="text-sm font-medium">{card.title}</h3>
          </div>

          <p className="truncate rounded-xl bg-secondary-0 px-4 py-8 text-center text-2xl text-secondary-500">
            {toPersianNumbers(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
export default CardsWrapper;
