import { useState } from "react";
import { counterItems, credentials } from "../constants";
import CountUp from "react-countup";
import CertificatesModal from "./CertificatesModal";

const AnimatedCounter = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-2-cols">
        {/* Years of Experience -- add after gaining experience*/}
        {/* <div className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
          <div className="counter-number text-white text-5xl font-bold mb-2">
            <CountUp
              suffix={counterItems[0].suffix}
              end={counterItems[0].value}
              duration={3}
              decimals={counterItems[0].value % 1 !== 0 ? 2 : 0}
            />
          </div>
          <div className="text-white-50 text-lg">{counterItems[0].label}</div>
        </div> */}

        {/* Credentials */}
        <div className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center gap-4">
          <p className="text-white-50 text-lg">{credentials.text}</p>
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="self-start px-5 py-2 rounded-md bg-white text-black font-semibold text-sm hover:bg-black-50 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            View Certificates
          </button>
        </div>

        {/* General Weighted Average */}
        <div className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center">
          <div className="counter-number text-white text-5xl font-bold mb-2">
            <CountUp
              suffix={counterItems[1].suffix}
              end={counterItems[1].value}
              duration={3}
              decimals={counterItems[1].value % 1 !== 0 ? 2 : 0}
            />
          </div>
          <div className="text-white-50 text-lg">{counterItems[1].label}</div>
        </div>
      </div>

      <CertificatesModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificates={credentials.certificates}
      />
    </div>
  );
};

export default AnimatedCounter;
