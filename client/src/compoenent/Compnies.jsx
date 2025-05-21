import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import {
  FaGoogle,
  FaApple,
  FaMicrosoft,
  FaAmazon,
  FaFacebook,
  FaTwitter,
  FaCar
} from "react-icons/fa";
import { SiNvidia, SiNetflix, SiSamsung } from "react-icons/si";

const TopCompanies = () => {
  const companies = [
    { name: "Google", icon: <FaGoogle /> },
    { name: "Apple", icon: <FaApple /> },
    { name: "Microsoft", icon: <FaMicrosoft /> },
    { name: "Amazon", icon: <FaAmazon /> },
    { name: "Meta", icon: <FaFacebook /> },
    { name: "Twitter (X)", icon: <FaTwitter /> },
    { name: "NVIDIA", icon: <SiNvidia /> },
    { name: "Netflix", icon: <SiNetflix /> },
    { name: "Samsung", icon: <SiSamsung /> },
    { name: "Tesla", icon: <FaCar /> },
  ];

  const containerRef = useRef();
  const sliderRef = useRef();

  useGSAP(() => {
    // Calculate the total width of one set of companies
    const totalWidth = sliderRef.current.scrollWidth / 2; // Since we duplicated the companies
    
    // Animation for the slider
    gsap.to(sliderRef.current, {
      x: -totalWidth, // Move left by the width of one set
      duration: 20,
      ease: "none",
      repeat: -1, // Infinite loop
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Reset position when it reaches the end
      }
    });
  }, []);

  return (
    <div className="relative overflow-hidden p-4 bg-white shadow rounded">
      <div ref={containerRef} className="flex">
        {/* Duplicate the companies twice for seamless looping */}
        <div ref={sliderRef} className="flex gap-5">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`company-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition rounded min-w-[120px]"
            >
              <div className="text-4xl mb-2">{company.icon}</div>
              <div className="text-sm font-medium text-gray-700 text-center">{company.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;