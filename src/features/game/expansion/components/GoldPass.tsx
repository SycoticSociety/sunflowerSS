import React from "react";

import goldPass from "assets/announcements/gold_pass.png";
import { Panel } from "components/ui/Panel";

interface Props {
  onClose: () => void;
}

export const GoldPassModal: React.FC<Props> = ({ onClose }) => {
  const price = 0.00;
  const [purchased, setPurchased] = React.useState(false);

  const handlePurchase = () => {
    // Perform any purchase logic here
    // For example, you can set the 'purchased' state to true
    setPurchased(true);
  };

  const Content = () => {
    return (
      <>
        <div className="flex flex-col p-2">
          <img src={goldPass} className="w-full rounded-md my-2 img-highlight mr-2" />
          <p className="text-sm mb-1">Unlock the power of the Gold Pass:</p>
          <ul className="list-disc">
            <li className="text-xs ml-4">Craft rare NFTs</li>
            <li className="text-xs ml-4">Trade with other players</li>
            <li className="text-xs ml-4">Participate in Auction Drops</li>
            <li className="text-xs ml-4">Withdraw & Transfer NFTs</li>
            <li className="text-xs ml-4">Access to restricted areas</li>
          </ul>

          <a
            href="https://docs.sunflower-land.com/fundamentals/blockchain-fundamentals#gold-pass"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xxs pb-1 pt-0.5 hover:text-blue-500"
          >
            Read more
          </a>
        </div>
        <div className="flex">
          <Button className="mr-1" onClick={onClose}>
            No thanks
          </Button>
          <Button onClick={handlePurchase}>
            {`Buy now $${price}`}
          </Button>
        </div>
        {purchased && (
          <div className="flex justify-center my-0.5">
            <span className="text-xxs italic">Purchase successful!</span>
          </div>
        )}
        <div className="flex justify-center my-0.5">
          <span className="text-xxs italic">{`Price is paid in $MATIC equivalent of $${price} USD`}</span>
        </div>
      </>
    );
  };

  return (
    <Panel bumpkinParts={NPC_WEARABLES.grubnuk}>
      <Content />
    </Panel>
  );
};
