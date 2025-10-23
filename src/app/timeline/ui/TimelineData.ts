
// Move data to separate file for better code splitting
export interface TimelineEvent {
  date?: string;
  title: string;
  description: string;
  video?: string;
  image?: string;
}

export interface SeasonData {
  background: string;
  events: TimelineEvent[];
}

export const timelineData: Record<string, SeasonData> = {
  season1: {
    background: "/timeline/S1Background.png",
    events: [
      {
        date: "September 14th 2020",
        title: "Creation",
        description: "Following a previous SMP that closed down, The Grimwald discord was created and the server was brought online for the first time. A few members from the old SMP remained and many new players joined."
      },
      {
        date: "October 19th 2020",
        title: "Trailer",
        description: "The first trailer for Grimwald SMP was created.",
        video: "https://www.youtube.com/watch?v=PGXHY-E-CYU"
      },
      {
        title: "Weekly Lawless Day",
        description: "Season 1 saw an ongoing event created by one of the owners, Every Friday players were free to steal from each others bases, PVP and create traps to defend their items. Players who did not wish to participate had to place a white banner at their base, Very few members actually enjoyed this event and most just opted out, so it only went on for a few weeks."
      },
      {
        date: "October 29th 2020",
        title: "Empires Form",
        description: "Two empires arose, each governing distinct regions of the realm. People took sides, pledging allegiance. One empire dissolved due to its leader's being removed from the server due to age restrictions, but a new one swiftly emerged, welcoming fresh members. The clash between these rival empires eventually erupted into a full-scale war."
      },
      {
        date: "Early November 2020",
        title: "First Event",
        description: "After a brief arena-building phase, we kicked off our first event. Players went head-to-head in intense PvP matches. Meanwhile, those averse to combat had the option to place bets on their favored participants."
      },
      {
        date: "November 12th 2020",
        title: "Collapse of an Empire",
        description: "The new empire's leader gained admin privileges during a period when the other administrators were inactive. In an instant, the entire faction acquired top-tier equipment and constructed an expansive stronghold. Another player found evidence of illegal items whilst sneaking around their base and revealed that the leader had been exploiting admin powers, which resulted in their ban and the subsequent dissolution of the empire. Despite this downfall, a handful of steadfast members endeavored to reform the group, aiming to uphold their leader's legacy."
      }
    ]
  },
  season2: {
    background: "/timeline/S2Background.png",
    events: [
      {
        date: "November 14th 2020",
        title: "Season 2 Begins",
        description: "The aftermath of the events in season 1 left numerous players disenchanted, with a handful even choosing to depart from the game. A collective sentiment called for a clean slate, prompting the commencement of season 2. This new chapter was a notably tranquil period free from player conflicts that had defined the prior season."
      },
      {
        title: "The Major bases",
        description: "Season 2 witnessed the establishment of two primary bases. The initial one sprawled across a mushroom island, featuring an array of farms. The second was a structure seamlessly integrated into a mountainside. Remarkably, the latter base evolved into the preferred residence for nearly all participants who joined during this season.",
        image: "/timeline/S2Base.png"
      },
      {
        date: "Some point during December 2020",
        title: "Skin Competition",
        description: "Our second event took the form of a skin competition. However, it was evident that the attendance didn't reach the levels achieved during the season 1 PvP event."
      },
      {
        date: "January 12th 2021",
        title: "Season 2 Ends (D-Day event)",
        description: "As season 2 drew to a close, a novel tradition emerged on the server, aptly named D-Day. The term 'D-Day' symbolizes the Day of Destruction, signifying the moment when the server community unites to systematically dismantle all their previous accomplishments before transitioning to a fresh season."
      }
    ]
  },
  season3: {
    background: "/timeline/S3Background.png",
    events: [
      {
        date: "January 13th 2021",
        title: "Season 3 Begins",
        description: "Following the conclusion of season 2, we opted for a distinctive approach in the third season. Season 3 introduced a customized map, partitioned into three territories. At the onset of the season, a sense of calm prevailed, but it didn't take long for the tranquility to give way to complete chaos. (Map name: Wandering Isles)"
      },
      {
        date: "January 16th 2021",
        title: "The Empires",
        description: "Within each territory, a different empire held dominion. Notably, two of these empires embraced a peaceful stance, One began building in in the sandy expanse of the South-East and used their surroundings as inspiration for their name 'Fallen sands' whilst the other flourished amidst the vast plains to the west naming themselves 'Glamour', the final empires (dubbed 'únbekannt') base was perched high in the North-Eastern mountains. It was this last empire, positioned amidst the rugged terrain, that actively prepared for the looming conflict."
      },
      {
        date: "Late January 2021",
        title: "Point Capture",
        description: "A point capture style minigame was created and we planned to play it as a server event, However due scheduling issues and the events that unfolded shortly after, we never got the chance."
      },
      {
        date: "February 12th 2021",
        title: "Tensions Rise",
        description: "Following the settlement of two individuals on the fringes únbekannt territory, tensions escalated into a full-blown conflict between these parties. Ironically, the settlers simply sought a peaceful life and a place to call home."
      },
      {
        date: "February 13th 2021",
        title: "The Intervention",
        description: "Tensions reached a boiling point as únbekannt endeavored to expel the two settlers. Upon learning of this incident, the two peaceful empires intervened, inadvertently causing the únbekannt empire to obliterate the settlers' home, this was a breach of server regulation and the once-enjoyable atmosphere turned sour, triggering a D-Day event the following day."
      }
    ]
  },
  season4: {
    background: "/timeline/S4Background.png",
    events: [
      {
        date: "February 15th 2021",
        title: "Season 4 (The First Modded Season) Begins",
        description: "As a result of the previous season the admins vowed to ban wars for the foreseeable furture. Players wanted something new and at the time a new mod was gaining popularity, We decided to start a new world with this mod that allowed players to choose a class which both imposed limitaions and imparted powers upon (Mod: Origins)"
      },
      {
        date: "February 16th 2021",
        title: "Groups Form",
        description: "Like the seasons before it, Season 4 saw players split of into small groups, most players opted to live together with people who choose the same or a similar class to them."
      },
      {
        date: "February 19th 2021",
        title: "Co-Owner Dispute",
        description: "Amidst a dispute between a player and one of the co-owners, who was accused of misusing administrative privileges, the said co-owner opted to step down from their position. Consequently, the server was left under the management of the remaining two co-owners."
      },
      {
        date: "March 1st 2021",
        title: "Season 4 Ends",
        description: "There is not much left to be said about season 4, It kept going for a little while until players got bored and it Once all players were done with this season we decided to start anew. (Which of course meant blowing up the entire server once again)"
      }
    ]
  },
  season5: {
    background: "/timeline/S5Background.png",
    events: [
      {
        date: "March 2nd 2021",
        title: "Season 5 Begins",
        description: "Season 5 emerged as the most successful season yet, boasting an unprecedented influx of bases and active participants. Notably, this season spurred certain players to embark on the ambitious endeavor of constructing larger-than-usual bases."
      },
      {
        title: "Smaller Bases",
        description: "In addition to the larger bases, Season 5 saw new members come together and build smaller bases scattered across the world, contributing to a more diverse and intricate landscape",
        image: "/timeline/S5Base.png"
      },
      {
        date: "May 1st 2021",
        title: "The Minigame Event",
        description: "In Season 5, a fresh event was introduced where players devoted a week to constructing various games, including a boat race, an elytra course, a point capture game, a moving maze, parkour, and an attack and defense-style game. All these games were set to be played in a single day. This event marked the most successful one to date. However, during the attack and defense game, some players chose to disregard the rules, leading to an unfair experience for others.",
        image: "/timeline/S5Minigames.png"
      },
      {
        date: "May 6th 2021",
        title: "The Season Revival",
        description: "The minigame boosted activity on the server and many players who were previously inactive started playing again however most felt like they had been left behind and opted for a reset."
      }
    ]
  },
  season6: {
    background: "/timeline/S6Background.png",
    events: [
      {
        date: "May 7th 2021",
        title: "Season 6 Begins",
        description: "Following the return to foundational principles in Season 5, we embarked on a fresh concept for Season 6. This time, a border was implemented, restricting the available building space for players. Surprisingly, this limitation played a pivotal role in fostering a tighter-knit community, bringing players closer together."
      },
      {
        title: "Bases begin to be built",
        description: "Season 6 witnessed the creation of a significant communal base, a collaborative endeavor involving five players. The base featured charming small houses nestled into the mountains encircling a valley, connected by bridges. To safeguard the group's farms, the valley was enclosed by protective wooden walls. Intriguingly, this base's allure prompted other players not in the group to construct their dwellings nearby, contributing their own bridges that extended from the central base towards their respective bases.",
        image: "/timeline/S6Base.png"
      },
      {
        date: "May 25th 2021",
        title: "Shopping District",
        description: "Season 6 also boasted the most extensive shopping district yet, showcasing a plethora of distinctive shops. Notably, the district included a designated mayoral space and a colossal statue."
      },
      {
        date: "June 18th 2021",
        title: "The Border Expands",
        description: "With a game update rolling in, the season experienced an expansion of its border, granting players the freedom to venture into new territories and explore the fresh content introduced by the update."
      },
      {
        date: "July 4th 2021",
        title: "Season 6 Ends",
        description: "Not long after the border was expanded people get bored and want a fresh start."
      }
    ]
  },
  season7: {
    background: "/timeline/S7Background.png",
    events: [
      {
        date: "July 5th 2021",
        title: "Season 7 Begins",
        description: "Although Season 7 had no border we kept the concept of fostering a tight-knit community by having players build their initial bases near each other. While they had the option to venture out and construct secondary bases elsewhere, the majority opted to remain close together."
      },
      {
        title: "No shopping district",
        description: "In contrast to the previous seasons, Season 7 didn't feature a designated shopping district. Instead, shops were positioned in proximity to various builds across the server mainly those in the central area where most players lived."
      },
      {
        date: "July 8th 2021",
        title: "The Faction Games begin",
        description: "Season 7 hosted the most extensive event yet, spanning several weeks and pitting two teams against each other in diverse challenges. The initial challenge revolved around a base-building competition, followed by a fresh PvP event reminiscent of the one from Season 1. The idea was to have a new challenge each week of the season but it got abandoned after only two challenges as players lost interest.",
        image: "/timeline/S7FactionBuild.png"
      },
      {
        date: "August 12th 2021",
        title: "Season 7 Ends",
        description: "After a while season 7 reaches its natural conclusion and activity starts to fade."
      }
    ]
  },
  season8: {
    background: "/timeline/S8Background.png",
    events: [
      {
        date: "August 13th 2021",
        title: "Season 8 (Modded) Begins",
        description: "In season 8 we decided to change things up again by introducing two new mods, Regrettably, this turned out to be the shortest season to date, primarily due to challenges faced by many players in installing or running the introduced mods. (Mods: Create, Biomes o' Plenty)"
      },
      {
        date: "September 13th 2021",
        title: "Season 8 Cancelled",
        description: "Season 8 was planned to be a longer season but after about two weeks only about 5 people had played due to many players having issues with the mods, The decision was made to keep the server up a bit longer even after activity had flatlined so we could start Season 9 on the server anniversary."
      }
    ]
  },
  season9: {
    background: "/timeline/S9Background.png",
    events: [
      {
        date: "September 14th 2021",
        title: "Season 9 Begins (One Year Anniversary!)",
        description: "To commemorate the one year anniversary of the server, the decision was made to embark on a fresh start using the exact same seed that was used for Season 1. This choice brought the server full circle, returning to the original landscape of season 1 and bringing a sense of nostalgia."
      },
      {
        date: "September 15th 2021",
        title: "SNAD",
        description: "A typo of 'Sand' being written as 'Snad' sparked an unexpected development as players constructed an intricate lore around this and even build a vault to house 'Snad'.",
        image: "/timeline/S9Snad.png"
      },
      {
        title: "Reminiscent Builds",
        description: "Season 9 saw players build things that were reminiscent of season 1 such as a base that took components from bases from previous seasons and combined them together and one that was a new twist on an S1 base built in the same location.",
        image: "/timeline/S9Base.png"
      },
      {
        date: "September 21st 2021",
        title: "Omega Wealth Group",
        description: "One Group of players ventured out far away from the central area to build their own civilisation. They named this civilisation 'Omega Wealth' or 'OW' for short.",
        image: "/timeline/S9Base2.png"
      },
      {
        date: "October 2nd 2021",
        title: "The Election",
        description: "As this season was reminiscent of season one, we brought back the election, held in the recently constructed court house, The Omega Wealth and Snad Party both presented candidates for Mayor, Following the conclusion of the voting process, it was established that the Snad Party emerged victorious, securing the mandate for leadership.",
        image: "/timeline/S9Election.png"
      },
      {
        date: "October 3rd 2021",
        title: "Creative World",
        description: "A creative world was added to the server allowing players to design and plan out builds before commiting to building them on the main world."
      },
      {
        date: "October 13th 2021",
        title: "Dupe Stash",
        description: "Within the confines of the Omega Wealth base, a Stash of items acquired through illegal means was discovered, this brought to light an exploit that had been used by administrators, raising concerns about the integrity of staff on the server."
      },
      {
        date: "October 21st 2021",
        title: "PVP Event",
        description: "Sticking with the idea of being like season one, we did another PVP event however it was different from its predecessor, placing players in a confined map and giving them time to prepare and build defences before the fighting began."
      },
      {
        date: "Late October 2021",
        title: "Multiple Worlds",
        description: "Introducing multiple worlds brought a different approach to Season's end. Faced with a divided community, torn between restarting and persisting, we created the Season 10 world alongside Season 9. This allowed players seeking a fresh start to explore new realms, while those still engaged could maintain their progress in the existing world."
      }
    ]
  },
  season10: {
    background: "/timeline/S10Background.png",
    events: [
      {
        date: "Late October 2021",
        title: "Season 10 Begins",
        description: "Season 10 ran alongside S9 and only around 5 people played whilst the others decided to remain on the season 9 world, the group that played sought to built a fortress into a mountain but ultimately the project was abbandonded before it was completed."
      },
      {
        date: "November 4th 2021",
        title: "Multiple Games",
        description: "Shortly after the beggining of the season we tried to open up the server to different games that the community were interested in, Even briefly partnering with another server for a different survival/sandbox game."
      },
      {
        date: "November 29th 2021",
        title: "Season 10 Ends",
        description: "Majority of players decided to continue to play on the season 9 world instead of season 10 and with new players joining we decided to create a fresh world for them."
      }
    ]
  },
  season11: {
    background: "/timeline/S11Background.png",
    events: [
      {
        date: "November 30th 2021",
        title: "Season 11 ('The Forgotten Season') Begins",
        description: "Nobody seems to remember anything about this season except from the fact it started the same day that the 1.18 update came out and despite this was not on the new version. It may have also ran in parallel to the season 9 World."
      },
      {
        date: "January 1st 2022",
        title: "Season 11 Ends",
        description: "Nobody seems to remember this either. We have evidence of the dates of the start and end of the season, but somehow no other info?"
      }
    ]
  },
  season12: {
    background: "/timeline/S12Background.png",
    events: [
      {
        date: "January 2nd 2022",
        title: "Season 12 Begins",
        description: "For season 12 we decided to go back to modded using a mod that expands upon the abilities mod from Season 4, Due to these mods not been ready for the latest version we didn't update yet. (Mods: Origins, Added Origins, Origins Classes)"
      },
      {
        date: "January 16th 2022",
        title: "Other Games Removed",
        description: "After a few months of trying out featuring multiple games we eventually decided to stop and go back to the main focus being Minecraft due to inactivity in other games."
      },
      {
        date: "January 23rd 2022",
        title: "Season 12 Ends",
        description: "Many people didn't even log on during this season due to having to install the mods or being too busy so we ended it a lot quicker than many other seasons."
      }
    ]
  },
  season13: {
    background: "/timeline/S13Background.png",
    events: [
      {
        date: "January 24th 2022",
        title: "Season 13 Begins",
        description: "Season 13 went back to vanilla and was the first world that had the new world generation from 1.18."
      },
      {
        date: "February 28th 2022",
        title: "Season 13 2.0",
        description: "After the server was accidentally deleted by the host we were forced to make a new world and start over, people were understandably not happy about this and as such many people quit for a while."
      },
      {
        date: "April 10th 2022",
        title: "The Flood",
        description: "Towards the end of the season we decided to try something new to hopefully make the world a bit more unique and bring more interest, We raised the sea level of the world by about 100 blocks flooding everything. At the time not many people were actually active."
      },
      {
        date: "April 23rd 2022",
        title: "Season 13 Ends",
        description: "Unfortunately the idea of having a flooded world was not well recieved as once players did start to gain interest again they found it hard to get started in the flooded landscape, We put it to a vote and it was decided that we would bring back the S9 World in conjunction with the flooded one (For the few people who wanted to finish a few things on it)."
      }
    ]
  },
  season14: {
    background: "/timeline/S14Background.png",
    events: [
      {
        date: "April 24th 2022",
        title: "Season 14 Begins",
        description: "Season 9's world was reinstated, swiftly followed by the removal of the flooded world, leaving it as the sole map once more."
      },
      {
        date: "April 25th 2022",
        title: "The Pyramid",
        description: "During S14 One group (Formerly the SNAD Party in Season 9) decided to go with an Ancient Egyptian theme and construct a huge Pyramid"
      },
      {
        date: "June 22nd 2022",
        title: "Season 14 Ends",
        description: "Nothing else really notable happened during this season, many players just continued their old bases and some made a new ones eventually season 14 came to its natural conclusion as players voted to start afresh."
      }
    ]
  },
  season15: {
    background: "/timeline/S15Background.png",
    events: [
      {
        date: "June 23rd 2022",
        title: "Season 15 Begins",
        description: "Season 15 introduced a fresh twist by implementing datapacks to alter world generation, eliminating the need for players to install mods but still providing new content. This innovation attracted a surge of new players to the server. (Datapacks: Terralith, Towns and Towers)"
      },
      {
        date: "August 9th 2022",
        title: "PVP Event",
        description: "The server had been going strong over the summer but as August arrived activity started to fall off, One player organised a PVP tournament but unfortunately due to scheduling issues across timezones and general lack of interest nobody participated."
      },
      {
        date: "August 21st 2022",
        title: "Mods Added",
        description: "Many players still wanted to play on the same world however had lost interest, so we tried to add some mods to keep things fresh, this raised activity a for a bit."
      },
      {
        date: "September 14th 2022",
        title: "Season 15 Ends (Two Year Anniversary!)",
        description: "With activity falling and the second anniversary of the server coming up we opted to end the season and start another world."
      }
    ]
  },
  season16: {
    background: "/timeline/S16Background.png",
    events: [
      {
        date: "September 15th 2022",
        title: "Season 16 Begins",
        description: "In Season 16, we embraced a new approach by utilizing a pre-made, scaled-down map of the Earth. Each player was allowed to develop and construct within two countries of their choice, We also leveraged a plugin that enabled players to sell items for digital currency instead of relying on traditional diamond transactions. However, this system had its issues, as certain easily farmable items were disproportionately valued, leading to imbalances within the economy. (Map: 1:924 Scale Earth)"
      },
      {
        date: "September 25th 2022",
        title: "New Content",
        description: "People voted to add new content such as minecart planes, new melee weapons and even guns that could be purchased using the new economy system. Despite voting on this and the majority wanting it people had mixed opinions on these features after they were added."
      },
      {
        date: "October 15th 2022",
        title: "The end of Grimwald?",
        description: "Whilst the server had been fun, we began to notice a pattern. Our seasons never lasted as long as we hoped, people got bored and stopped playing fairly quickly, At this time nobody was really playing on the server anymore and there didn't seem to be any interest in starting another season, we made the difficult decision to shut down the server for the foreseeable future."
      }
    ]
  },
  season17: {
    background: "/timeline/S17Background.png",
    events: [
      {
        date: "June 7th 2023",
        title: "Season 17 Begins (The Revival)",
        description: "Grimwald experienced a revival with the release of the 1.20 update, marking our most active season to date. The prolonged closure of the server seemed to have spurred many old players to return, rekindling interest and enthusiasm within the community, We did not invite any new people at this time."
      },
      {
        title: "The Starter Village",
        description: "Following the precedent set by previous seasons, we encouraged most players to establish their starter bases in close proximity to each other. Players formed a starter village nestled around a picturesque lake.",
        image: "/timeline/S17StarterVillage.png"
      },
      {
        date: "June 12th 2023",
        title: "Plugins and New Players",
        description: "1.20s plugin supported arrived and with it we brought back our usual plugins along with a new one which allowed proximity voice chat within the server, With plugins to help moderate the server we opened the server to new players once more."
      },
      {
        title: "GC+ Base",
        description: "While most players opted to settle in the starter village, another group chose a different path, preferring the secrecy of an underground base as their dwelling.",
        image: "/timeline/S17GC.png"
      },
      {
        date: "June 23rd 2023",
        title: "Age Limit Dispute",
        description: "Recognising that the majority of our player base consisted of older individuals and that some younger players were causing issues, we made the decision to raise the age limit from 13 to 16. However, the decision sparked outrage among many players, leading to a wave of criticism directed towards the staff. In response to the community's feedback, we modified our stance, maintaining the age limit at 16 while permitting younger players who had already joined to remain, under the condition that they upheld respectful conduct and avoided causing disruptions. Additionally, during this period, we welcomed a new owner who contributed financially to the server's upkeep."
      },
      {
        date: "July 4th 2023",
        title: "The Perimeter Construction Begins",
        description: "Season 17 witnessed the inception of some of the server's most ambitious projects, notably featuring the creation of a massive perimeter.",
        image: "/timeline/S17Perimeter.png"
      },
      {
        date: "July 16th 2023",
        title: "The Megabed Construction Begins",
        description: "Season 17 also saw the emergence of another monumental project: the construction of a giant bed.",
        image: "/timeline/S17Megabed.png"
      },
      {
        date: "July 17th 2023",
        title: "The Camel Dispute",
        description: "In what could be considered one of the most unusual arguments in server history, players engaged in a two-hour debate over the whereabouts of a missing camel at spawn. Eventually, players were cautioned to cease arguing over the trivial matter."
      },
      {
        date: "August 14th 2023",
        title: "The End of Summer",
        description: "As the summer came to an end the activity halved, However the server still continued. We invited some new people once again in hopes of making it last a little bit longer."
      },
      {
        date: "September 14th 2023",
        title: "Three Year Anniversary!",
        description: "The server celebrates its third anniversary."
      },
      {
        date: "October 2nd 2023",
        title: "Bedrock and Multi-World Support",
        description: "In an attempt to prolong the season for the few players who were still working on their projects we added support for Bedrock players and added multiple new worlds like we had in previous seasons, However this didn't help much with activity."
      },
      {
        date: "November 7th 2023",
        title: "Season 17 Ends",
        description: "After 5 months, activity finally dropped to zero and the server closed down, making this our longest season yet, There was not enough interest and many players were bored or had no time to play so we opted not to start a new world right away and to wait until there was more interest."
      }
    ]
  },
  season18: {
    background: "/timeline/S18Background.png",
    events: [
      {
        date: "March 15th 2024",
        title: "Season 18 Begins",
        description: "Grimwald starts back up again for its 18th Season after players begin to show interest in starting a fresh world."
      },
      {
        title: "The Starter Village",
        description: "Similar to last season, The beginning of this season saw some players work together on a small starter village with a few public farms to help people get started."
      },
      {
        date: "March 18th 2024",
        title: "Shopping District Started",
        description: "The first shops are made in the new shopping district located north of the starter village."
      },
      {
        date: "March 19th 2024",
        title: "The Rail System",
        description: "A mono rail system is started that sees suspended rails placed around the shopping district and was supposed to be extended to connect to nearby bases, however the project was ultimately abbandonned."
      },
      {
        date: "March 22nd 2024",
        title: "Minigame Area Started",
        description: "One of the first major projects of the season starts construction, The Minigame Area.",
        image: "/timeline/S18Minigames.png"
      },
      {
        date: "March 23rd 2024",
        title: "Sofware Switch",
        description: "After struggling with a few annoying bugs with the server software we opted to switch to a different one, Which solves these issues but made it laggy for many players, We eventually decided to deal with the few issues rather than have it laggy so reverted back."
      },
      {
        date: "April 4th 2024",
        title: "Underground Shopping District",
        description: "A Secret Area under the shopping district is formed, The idea was that players can complete bounties to earn credits and increase their reputation with the underworld however the idea never fully took off due to some players behind the idea taking a break."
      },
      {
        title: "Major Projects",
        description: "Major projects continue to be worked on, including a giant tree, a town and a cyberpunk themed city.",
        image: "/timeline/S18City.png"
      },
      {
        date: "April 22nd 2024",
        title: "The Shop Competition",
        description: "Players voted on their favourite shop from a list of the top 5 shops selected by judges, The enchantment shop won earning 10 diamond blocks."
      },
      {
        date: "Early May 2024",
        title: "Less Activity",
        description: "Due exams and stuff going on irl for many players the server activity begins to decline a bit so not much happens in this period."
      },
      {
        title: "Projects Finished",
        description: "Some players finish up their projects during this time.",
        image: "/timeline/S18Projects.png"
      },
      {
        date: "May 28th 2024",
        title: "Minigame Event",
        description: "A sponteneous minigame event happens whilst a lot of people are online at once.",
        video: "https://www.youtube.com/watch?v=ZESykxUFD8Y"
      },
      {
        date: "June 19th 2024",
        title: "Shopping District Cinematic",
        description: "A short cinematic video of the shopping district this season is created.",
        video: "https://www.youtube.com/watch?v=wD_NnUGqi_0"
      },
      {
        date: "June 14th 2024",
        title: "The Vault Opens",
        description: "The Vault was a build made earlier in the season for players to store their gear for the world download, Players start filling the vault and diamonds with their items from this season."
      },
      {
        date: "June 20th 2024",
        title: "Season 18 Ends (Sort of)",
        description: "Although this was the official end of the season the world remained open for players to put their items in the vault, whilst we waited on things being updated so we could start the new season."
      },
      {
        date: "June 21st 2024",
        title: "Hardcore Between Seasons",
        description: "A hardcore world is set up for players to enjoy whilst we wait on everything being ready to start the next season."
      }
    ]
  },
  season19: {
    background: "/timeline/S19Background.png",
    events: [
      {
        date: "June 30th 2024",
        title: "Season 19 Begins",
        description: "After we finished the hardcore world and waited a few more days for updates, We started Season 19 on the latest version, Many players opted to go with a steampunk theme due to copper being a big part of the update.",
        image: "/timeline/S19SteampunkBase.png"
      },
      {
        title: "The Island",
        description: "This season we were more deliberate with our choice of seed, We chose to use an island seed that was small enough to encourage interactions between players whilst still having enough room for builds."
      },
      {
        title: "The Starter Village",
        description: "Once again we had a starter village, However this time only a handful of people decided to live there, with most choosing to go straight to their chosen area of the island."
      },
      {
        date: "July 13th 2024",
        title: "First Meet Up",
        description: "The First IRL Meetup happens in Poland."
      },
      {
        date: "July 21st 2024",
        title: "The Gaming District",
        description: "With the shopping district remaining underdeveloped throughout the season and most players just selling stuff from their home, Players worked on some games including a card table and used this gaming district as a social area, Meeting up to play card games whenever enough people were online.",
        image: "/timeline/S19Gaming.png"
      },
      {
        date: "August 14th 2024",
        title: "Four Year Anniversary!",
        description: "The server celebrates its fourth anniversary."
      },
      {
        date: "October 22nd 2024",
        title: "Season 19 Ends",
        description: "A couple months of little to no activity go by before we decide to end the season and start something new."
      }
    ]
  },
  season20: {
    background: "/timeline/S20Background.png",
    events: [
      {
        date: "October 23rd 2024",
        title: "Season 20 Begins",
        description: "Continuing our tradition of having a modded season every 4 seasons, We start season 20 with a custom modpack unfortunately we had to play on an older version due to some of the mods we were interested in not being up to date.",
      },
      {
        title: "Limitations",
        description: "A few problems very quickly realised when starting the season, Due to the amount of mods we had the server required a lot more performance than usual, making it more costly and some members were not able to play due to their PC not being powerful enough. It also appeared that many members were too busy to play during this time. Taking these factors under consideration we decided ahead of time that this season would only last 2 months maximum."
      },
      {
        title: "Ships",
        description: "With the addition of the Ship mod, We were able to build and sail ships across the ocean or through the skies, this lead to many players opting for a more nomadic lifestyle, living on their ships and setting up outposts whilst they explored. This was a nice change of pace from the usual seasons where players would build a base and stay there most of the time.",
        image: "/timeline/S20Ships.png"
      },
      {
        title: "Major Bases",
        description: "Depsite many players opting to live on their ship there was still a few major bases built this season, most of which focused on more technical mods and automation.",
        image: "/timeline/S20Base.png"
      },
      {
        date: "December 20th 2024",
        title: "Season S20 Ends",
        description: "Activity had dropped off significantly during December, with only a few players still active and the server sitting empty a lot of the time due to many players being too busy to play. We opted to end the season just shy of 2 months and take a break over the Christmas period."
      }
    ]
  }
};

// Helper function
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = url.split('youtu.be/')[1]?.split('?')[0] ||
    url.split('v=')[1]?.split('&')[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};
