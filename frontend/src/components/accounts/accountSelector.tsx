"use client";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./accountCard";

export const AccountSelector = ({ accounts }: any) => (
  <div className="w-9/12 flex flex-col m-auto gap-4">
    <div className="w-full">
      <Swiper
        navigation={accounts.length > 1}
        effect={"coverflow"}
        grabCursor={true}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper h-96 flex"
      >
        {accounts.map((account: any) => (
          <SwiperSlide
            key={account.username}
            className="border-2rounded-2xl flex"
          >
            <AccountCard account={account} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);
