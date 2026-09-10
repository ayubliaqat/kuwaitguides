"use client";

import { useEffect, useRef, useState } from "react";

const TOPICS = [
  "Visa & Entry",
  "Getting Around",
  "Weather",
  "Money & SIM",
  "Dress & Etiquette",
  "Food & Culture",
  "Places to Go",
];

export default function LongGuideSection() {
  const articleRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalDistance = Math.max(
        article.offsetHeight - viewportHeight,
        1
      );

      const travelled = Math.min(
        Math.max(-rect.top, 0),
        totalDistance
      );

      setProgress(travelled / totalDistance);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <article
      ref={articleRef}
      className="relative bg-white"
    >
      {/*
        The page scroll remains completely native.

        We intentionally DO NOT:
        - lock body overflow
        - prevent wheel events
        - manually change scrollTop
        - create a nested scroll container

        The tall article + sticky presentation creates the
        focused scrolling experience without fighting the browser.
      */}
      <div className="relative min-h-[300vh]">
        <div className="sticky top-0 flex min-h-screen items-center bg-white py-10 sm:py-14">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">

            {/* INTRO */}
            <header className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
              <span className="inline-flex rounded-full bg-[#0071E3] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-[0_7px_24px_rgba(0,113,227,0.28)]">
                Kuwait Guides
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0071E3] sm:text-4xl lg:text-5xl">
                We&apos;re Here to Guide You Through Kuwait
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#68686D] sm:text-lg sm:leading-8">
                Before you arrive, we&apos;ll help you understand the things
                that actually affect your trip — from visas and weather to
                food, culture, transport, places to visit, and the everyday
                details that make Kuwait easier to experience.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {TOPICS.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border-2 border-[#0071E3] bg-white px-4 py-2 text-xs font-bold text-[#0071E3] shadow-[0_4px_16px_rgba(0,113,227,0.14)] sm:text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </header>

            {/* MAIN ARTICLE FRAME */}
            <div className="relative mx-auto max-w-6xl">

              {/* Strong blue glow behind the article */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-3
                  rounded-[34px]
                  bg-[#0071E3]/25
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border-2
                  border-[#0071E3]
                  bg-white
                  shadow-[0_0_0_3px_rgba(0,113,227,0.08),0_0_35px_rgba(0,113,227,0.30),0_24px_75px_rgba(0,113,227,0.20)]
                "
              >
                {/* Strong blue top edge */}
                <div className="h-1.5 bg-[#0071E3]" />

                {/* ARTICLE */}
                <div className="bg-white px-7 py-9 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
                  <div className="mx-auto max-w-5xl">

                    {/* Opening */}
                    <div className="max-w-4xl">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        A better trip starts with knowing what to expect.
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Kuwait is not the kind of destination you need to
                        overcomplicate. But the experience becomes much easier
                        when you understand the country before you arrive.
                        Where you stay, how you move around, what the weather
                        feels like, how people spend their evenings, what to
                        wear, where to eat, and which places are actually worth
                        your time can all change the way your trip feels.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        That&apos;s what Kuwait Guides is here for. Instead of
                        throwing hundreds of attractions at you, we want to
                        give you useful context first — then help you decide
                        what belongs on your own trip.
                      </p>
                    </div>

                    {/* Visa */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Kuwait visa and entry information
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        One of the first things any traveller needs to figure
                        out is whether they can enter Kuwait, what type of
                        permission they need, and what documents or conditions
                        apply to their particular situation.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Because visa and entry rules can change, we don&apos;t
                        want you relying on a random old blog post or a
                        screenshot that someone shared years ago. Our guides
                        explain the process in plain language and point you
                        toward the information that should be checked before
                        you travel.
                      </p>

                      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#0071E3]/25 shadow-[0_9px_30px_rgba(0,113,227,0.11)]">
                        <div className="bg-[#0071E3] px-5 py-4 sm:px-6">
                          <h4 className="font-bold text-white">
                            What you should check before travelling
                          </h4>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[680px] text-left text-sm">
                            <thead className="bg-[#F0F6FF] text-[#0071E3]">
                              <tr>
                                <th className="px-6 py-4 font-bold">
                                  Information
                                </th>

                                <th className="px-6 py-4 font-bold">
                                  Why it matters
                                </th>

                                <th className="px-6 py-4 font-bold">
                                  What to use
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-[#0071E3]/10">
                              <tr>
                                <td className="px-6 py-5 font-semibold text-[#1D1D1F]">
                                  Visa eligibility
                                </td>

                                <td className="px-6 py-5 text-[#68686D]">
                                  Eligibility can depend on nationality,
                                  passport and individual circumstances.
                                </td>

                                <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                  Current official guidance
                                </td>
                              </tr>

                              <tr>
                                <td className="px-6 py-5 font-semibold text-[#1D1D1F]">
                                  Entry requirements
                                </td>

                                <td className="px-6 py-5 text-[#68686D]">
                                  Requirements and procedures can change.
                                </td>

                                <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                  Official authority
                                </td>
                              </tr>

                              <tr>
                                <td className="px-6 py-5 font-semibold text-[#1D1D1F]">
                                  Travel documents
                                </td>

                                <td className="px-6 py-5 text-[#68686D]">
                                  Having the right documents ready can prevent
                                  unnecessary problems.
                                </td>

                                <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                  Current requirements
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mt-8 rounded-2xl border-2 border-[#0071E3] bg-[#F5F9FF] p-6 shadow-[0_10px_30px_rgba(0,113,227,0.13)] sm:p-7">
                        <h4 className="text-lg font-bold text-[#0071E3]">
                          Where to get the latest updates
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-[#3A3A3C] sm:text-base">
                          For anything that can affect whether you can enter
                          Kuwait — especially visas, entry requirements and
                          official travel procedures — the current official
                          source should always be your final check.
                        </p>

                        <p className="mt-3 text-sm font-semibold leading-7 text-[#0071E3]">
                          We can explain the information. The current official
                          authority should confirm the rule.
                        </p>
                      </div>
                    </section>

                    {/* Accuracy */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Is the information actually accurate?
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        This matters because travel information ages quickly.
                        A restaurant can close, an attraction can change its
                        opening hours, a price can move, a road can become
                        difficult during certain hours, and government
                        requirements can change completely.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        We want Kuwait Guides to be useful without pretending
                        that every piece of information is permanent. When
                        something is time-sensitive, we&apos;ll make that clear
                        and direct you toward the appropriate current source.
                      </p>

                      <div className="mt-8 rounded-2xl border-2 border-[#0071E3] bg-[#F7FAFF] p-6 shadow-[0_10px_32px_rgba(0,113,227,0.13)] sm:p-8">
                        <h4 className="text-xl font-bold text-[#0071E3]">
                          Our approach to current information
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-[#3A3A3C] sm:text-base">
                          Practical local advice belongs in a guide. Rules
                          that can change belong with a current official
                          source. We keep those two things clear so you know
                          what you can use as practical guidance and what you
                          should verify before acting on it.
                        </p>
                      </div>
                    </section>

                    {/* Getting Around */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Getting around Kuwait
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Kuwait is a place where understanding distances makes
                        a difference. Two places can look close on a map and
                        still take much longer to reach depending on traffic
                        and the time of day.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        We&apos;ll help you understand the practical choices:
                        when a ride makes sense, when renting a car is worth
                        considering, how traffic affects plans, and how to
                        structure your day so you aren&apos;t constantly
                        crossing the city.
                      </p>
                    </section>

                    {/* Weather */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        What Kuwait&apos;s weather actually feels like
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Saying that Kuwait is hot doesn&apos;t tell you very
                        much. The difference between seasons, daytime and
                        evening, indoor and outdoor plans, and the way heat
                        changes your schedule matters much more.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Our weather guidance is designed around what you can
                        actually do with the information — what to pack, when
                        outdoor plans are comfortable, when the heat becomes
                        difficult, and how to plan your days around the
                        conditions.
                      </p>
                    </section>

                    {/* Money & SIM */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Money, cards and getting connected
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        The practical details matter more than they sound.
                        Knowing how you&apos;ll pay, how you&apos;ll stay
                        connected and what you need when you first arrive can
                        make the first few hours of a trip considerably easier.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        We&apos;ll cover SIM options, payment habits, cash,
                        cards, tipping and the little things travellers often
                        only learn after they have already needed them.
                      </p>
                    </section>

                    {/* Culture */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Food, culture and everyday etiquette
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Kuwait is much more interesting when you understand
                        the context behind what you see. Food, hospitality,
                        family life, dress, social customs and everyday
                        interactions all tell you something about the country.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        We&apos;ll help you approach those things respectfully
                        without making them feel intimidating. You&apos;ll
                        learn what is generally expected, what changes during
                        Ramadan, how dining works, and how a few simple
                        courtesies can make interactions more comfortable.
                      </p>

                      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#0071E3]/20 shadow-[0_8px_28px_rgba(0,113,227,0.10)]">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-[#0071E3] text-white">
                            <tr>
                              <th className="px-6 py-4 font-bold">
                                Area
                              </th>

                              <th className="px-6 py-4 font-bold">
                                What you&apos;ll learn
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-[#0071E3]/10">
                            <tr>
                              <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                Food
                              </td>

                              <td className="px-6 py-5 text-[#68686D]">
                                Local dishes, restaurants, cafés, dining
                                habits and what is worth trying.
                              </td>
                            </tr>

                            <tr>
                              <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                Culture
                              </td>

                              <td className="px-6 py-5 text-[#68686D]">
                                Hospitality, traditions and everyday life.
                              </td>
                            </tr>

                            <tr>
                              <td className="px-6 py-5 font-semibold text-[#0071E3]">
                                Etiquette
                              </td>

                              <td className="px-6 py-5 text-[#68686D]">
                                Dress, manners, Ramadan considerations and
                                useful social context.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Places */}
                    <section className="mt-16">
                      <h3 className="text-2xl font-bold tracking-tight text-[#0071E3] sm:text-3xl lg:text-4xl">
                        Places worth discovering
                      </h3>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        Then there&apos;s the fun part: deciding where you
                        actually want to spend your time. Kuwait has far more
                        than a checklist of famous attractions.
                      </p>

                      <p className="mt-5 text-[15px] leading-8 text-[#3A3A3C] sm:text-base">
                        We&apos;ll guide you through restaurants, cafés,
                        beaches, malls, souqs, parks, landmarks,
                        neighbourhoods and lesser-known places — with context
                        about what each place is like and when it makes sense
                        to go.
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {[
                          "Restaurants",
                          "Cafés",
                          "Beaches",
                          "Malls",
                          "Souqs",
                          "Parks",
                          "Landmarks",
                          "Neighbourhoods",
                          "Hidden Gems",
                        ].map((place) => (
                          <div
                            key={place}
                            className="rounded-xl border-2 border-[#0071E3]/15 bg-white px-4 py-5 text-center text-sm font-bold text-[#0071E3] shadow-[0_5px_17px_rgba(0,113,227,0.07)]"
                          >
                            {place}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Final */}
                    <section className="mt-16">
                      <div className="rounded-2xl bg-[#0071E3] p-7 text-white shadow-[0_16px_45px_rgba(0,113,227,0.30)] sm:p-10">
                        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                          Less guessing. More experiencing Kuwait.
                        </h3>

                        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-white/90 sm:text-base">
                          Whether you&apos;re visiting for a few days, planning
                          a longer stay, or simply curious about Kuwait,
                          we&apos;re here to make the country easier to
                          understand — from the practical details to the food,
                          culture and places worth discovering.
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Scroll progress */}
              <div className="mx-auto mt-5 h-1.5 max-w-xs overflow-hidden rounded-full bg-[#0071E3]/10">
                <div
                  className="h-full rounded-full bg-[#0071E3] shadow-[0_0_12px_rgba(0,113,227,0.55)] transition-[width] duration-150"
                  style={{
                    width: `${Math.max(progress * 100, 2)}%`,
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
