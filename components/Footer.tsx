import styles from "../../styles/Thirdweb.module.css";
import React from "react";

import AnchorLink from '../components/ui/links/anchor-link';


import Image from "next/image";

import LogoMomocon from '/assets/images/logo-momocon.svg';


import { Instagram } from '../components/icons/brands/instagram';
import { Twitter } from '../components/icons/brands/twitter';


export default function Footer() {

  ///const url = "https://github.com/thirdweb-example/marketplace-next-ts";
  return (

    <footer className="mt-10">
      <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
        <div>Copyright ©MOMOCON</div>

        <AnchorLink href="/terms">Terms of Service</AnchorLink>

        <div>Privacy Policy</div>
      </div>

      <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-20 pt-3 text-white ">
        <div>
          <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
        </div>

        <AnchorLink
          href="https://www.instagram.com/nftgranderby"
          target="_blank"
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <Instagram className="h-4 w-4" /> Instagram
        </AnchorLink>
        <AnchorLink
          href="https://twitter.com/nftgranderby"
          target="_blank"
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <Twitter className="h-4 w-4" /> Twitter
        </AnchorLink>
      </div>
      
    </footer>

  );
}
