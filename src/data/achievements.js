/* ─────────────────────────────────────────────────────
   achievements.js  —  ALL data keyed by year
   To add a new year, add entries in every *ByYear object.
───────────────────────────────────────────────────── */

/* Hero images */
export const heroImages = {
  "2024-2025": "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1756821844/DSC02741_oocb84.jpg",
  "2025-2026": "https://res.cloudinary.com/aaqzfmzc/image/upload/v1787248961/_DSC0669_1.jpg",
  "2026-2027": "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Nidhi_with_drr_hgbrjj.jpg",
};

/* Best club rank badge */
export const bestClubRankByYear = {
  "2024-2025": "8th Best Club",
  "2025-2026": "5th Best Club",
  "2026-2027": "?",
};

/* District assembly info card */
export const districtAssemblyByYear = {
  "2024-2025": {
    title: "10th District Assembly",
    subtitle: "& Aara Night",
    date: "26th July 2025",
    by: "by Rotaract District 3141 Dashak",
  },
  "2025-2026": {
    title: "11th District Assembly",
    subtitle: "& Aara Night",
    date: "11th July 2026",
    by: "by Rotaract District 3141 ELIXIR",
  },
  "2026-2027": null, // fill when known
};

/* District event name (Dashak, ELIXIR, etc.) */
export const districtEventNameByYear = {
  "2024-2025": "Dashak",
  "2025-2026": "ELIXIR",
  "2026-2027": "—",
};

/* Club achievement swiper slides */
export const achievementSlidesByYear = {
  "2024-2025": [
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756827418/8THBEST_nhwai3.png",
      desc: "8th Best Club in District 3141",
    },
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756827419/RUBY_CITATION_kbnanz.png",
      desc: "Ruby Spotlight Citation",
    },
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756827419/CLUB_SITE_up0tpu.png",
      desc: "Best Club Website",
    },
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756827421/RESPONSIBLE_PRESIDENT_azc0pj.png",
      desc: "Responsible President Citation",
    },
  ],
  "2025-2026": [
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984886/5th_best_unezv5.jpg ",
      desc: "5th Best Club in District 3141",
    },
    {
      img: "https://res.cloudinary.com/aaqzfmzc/image/upload/v1787250513/Ruby_citation_1.jpg",
      desc: "Ruby Spotlight Citation",
    },
    {
      img: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786986799/Best_club_website_izf3bm.jpg",
      desc: "Best Club Website",
    },
    {
      img: "https://res.cloudinary.com/aaqzfmzc/image/upload/v1787248961/_DSC0964.jpg",
      desc: "Responsible President Citation",
    },
  ],
  "2026-2027": [], // CHANGE ME
};

/* Personal achievement photo cards */
export const personalAchievementsByYear = {
  "2024-2025": [
    {
      id: 1,
      title: "Outstanding Vice President at district 3141",
      name: "Rtr. Aizab Khan",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756789422/DSC03051_fg0pak.jpg",
    },
    {
      id: 2,
      title: "Unstoppable Council Member at district 3141",
      name: "Rtr. Sumit Sharma",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756821756/DSC02604_jmaoow.jpg",
    },
  ],
  "2025-2026": [
    {
      id: 1,
      title: "Outstanding President",
      name: "Rtr. Vaishnavi Ranjan",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984889/Outstanding_President_xoyzis.jpg", // CHANGE ME
    },
    {
      id: 2,
      title: "Outstanding Secretary",
      name: "Rtr. Aaditya Yadav",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1787342634/Outstanding_Secretary_fkhpu3.jpg", // CHANGE ME
    },
    {
      id: 3,
      title: "Best President Secretary Relation",
      name: "Rtr. Vaishnavi Ranjan & Rtr. Aaditya Yadav",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Best_President_Secretary_relation_egbof9.jpg", // CHANGE ME
    },
    {
      id: 4,
      title: "Outstanding Vice President",
      name: "Rtr. Aaryan Gupta",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Outstanding_Vice_president_Aaryan_gupta_a8okwe.jpg", // CHANGE ME
    },
    {
      id: 5,
      title: "Outstanding Vice President",
      name: "Rtr. Prathamesh Singh",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Outstanding_vice_President_Prathamesh_kkjclx.jpg", // CHANGE ME
    },
    {
      id: 6,
      title: "Best Partner In Service Director",
      name: "Rtr. Diya Tailor",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984886/Best_PIS_director_-_Diya_xnlklw.jpg", // CHANGE ME
    },
    {
      id: 7,
      title: "Best Upcoming Council",
      name: "Rtr. Sudiksha Kapoor",
      image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984897/Best_Upcoming_council_sudiksha_tdkzpu.jpg", // CHANGE ME
    },
  ],
  "2026-2027": [], // CHANGE ME
};

/* Achievement Moments slider images */
export const achievementMomentsByYear = {
  "2024-2025": [
    { id: 1, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756996211/IMG_7333_tqqivm_nhpwrj.jpg" },
    { id: 2, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756996210/Copy_of_IMG_2045_ovdcd4_pn8vqx.jpg" },
    { id: 3, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756996209/IMG_7404_bc1gjb_udmstq_godqvw.jpg" },
    { id: 4, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756996208/IMG_7329_qffgwb_lvl2yg.jpg" },
    { id: 5, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756996208/Copy_of_IMG_2049_oglzrf_wuqkxo.jpg" },
  ],
  "2025-2026": [
    { id: 1, image: "https://res.cloudinary.com/aaqzfmzc/image/upload/v1787248961/_DSC0669_1.jpg" },
    { id: 2, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Best_President_Secretary_relation_egbof9.jpg" },
    { id: 3, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Outstanding_Vice_president_Aaryan_gupta_a8okwe.jpg" },
    { id: 4, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1787262739/AARA4_litcdl.jpg" },
    { id: 5, image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984886/5th_best_unezv5.jpg" },
  ], // CHANGE ME
  "2026-2027": [], // CHANGE ME
};

/* Crowns of the Quarter + Nominations + Acer */
export const crownsOfTheQuarterDataByYear = {
  "2024-2025": {
    crownOfQuarter: [
      { title: "Club Service", project: "Khoj Go get 'em 3.0" },
      { title: "Entrepreneurship Development", project: "Entrepreneurs Got Latent" },
      { title: "Social Media Campaign", project: "Young Entrepreneurs" },
    ],
    clubNominations: {
      "Quarter 1": [
        { title: "Best Club Service", project: "Crewmate Conspiracy" },
        { title: "Best Community Service", project: "Digital Discovery" },
        { title: "Best International Service", project: "Nurture with Knowledge" },
        { title: "Best Editorial", project: "Words-a-day" },
      ],
      "Quarter 2": [
        { title: "Best International Service", project: "Cosmic Classroom" },
        { title: "Best Sports", project: "Shuttle Strikers" },
        { title: "Best Digital Communications", project: "TFrame: Short Film Festival" },
        { title: "Best SM Campaign", project: "Know the Unknown: Bringing hidden diseases to light" },
        { title: "Best Joint Project", project: "Around the world in 90 minutes" },
      ],
      "Quarter 3": [
        { title: "Best Club Service", project: "Khoj Go Get 'Em 3.0" },
        { title: "Best Professional Development", project: "Future Skills Conclave: Bridging the gap between academia and industry" },
        { title: "Best Entrepreneurship Development", project: "Entrepreneurs Got Latent" },
        { title: "Best Public Relations", project: "SGNP Cleanup Drive" },
        { title: "Best Digital Communications", project: "Visual Velocity: Battle of Designers" },
      ],
      "Quarter 4": [
        { title: "Best Club Service", project: "Khushiyon ka Zaiqa" },
        { title: "Best HRD", project: "Officers Training Program" },
        { title: "Best SM Campaign", project: "Young Entrepreneurs" },
        { title: "Best Joint Project", project: "Furever Friends" },
      ],
      "Annual": [
        { title: "Best Flagship Project", project: "Techworld" },
        { title: "Best Ongoing Project", project: "Mudita: Bringing happiness to smiles" },
        { title: "Best Club Website", project: "Rotaract Club Of TCET" },
      ],
    },
    individualNominations: [
      { title: "Outstanding President", name: "Rtr. Tanisha Kumar" },
      { title: "Best President Secretary Relations", name: "Rtr. Tanisha Kumar and Rtr. Prabhat Maurya" },
      { title: "Outstanding Joint Secretary", name: "Rtr. Aniska Bachar" },
      { title: "Outstanding Joint Secretary", name: "Rtr. Aaditya Yadav" },
      { title: "Outstanding Vice President", name: "Rtr. Sudiksha Kapoor" },
      { title: "Outstanding Vice President", name: "Rtr. Aizab Khan" },
      { title: "Outstanding Director Community Service", name: "Rtr. Aaryan Gupta" },
      { title: "Outstanding Director Professional Development", name: "Rtr. Jaidan Maity" },
      { title: "Outstanding Director HRD", name: "Rtr. Saumya Mishra" },
      { title: "Outstanding Director Public Relations", name: "Rtr. Jeneesh Joshi" },
      { title: "Outstanding Editor", name: "Rtr. Rudra Sharma" },
      { title: "Outstanding New Comer", name: "Rtr. Shreevathsa Bhat" },
    ],
    // Project wins — shows as chip cards under Project Achievement
    projectAchievements: [
      {
        title: "Project Acer",
        desc: "Outstanding Social Media Campaign - Young Entrepreneurs",
        image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756821844/DSC02741_oocb84.jpg"
      }
    ],

  },
  "2025-2026": {
    crownOfQuarter: [
      { title: "Joint Project", project: "Around the world - Quarter 2" },
      { title: "Joint Project", project: "Dear - Quarter 3" },
      { title: "Editorial Project", project: "The lost manuscript Mafia edition - Quarter 4" },
      { title: "Social Media", project: "Codex - codewali diwali - Quarter 2" },
      { title: "Sports", project: "Mismatch league - Quarter 2" },
    ],
    clubNominations: {
      "Quarter 1": [
        { title: "Best Editorial Project", project: "Quirk quest" },
        { title: "Best Digital Communication Project", project: "Visual velocity 2.0" },
        { title: "Best HRD Project", project: "R.O.T.O.R" },
        { title: "Best PIS Project", project: "Panache" },
      ],
      "Quarter 2": [
        { title: "Best Joint Project", project: "Around the world" },
        { title: "Best Editorial Project", project: "What's the tea" },
        { title: "Best Social Media Project", project: "Codex - codewali diwali" },
        { title: "Best PIS Project", project: "Suits - the interact court room" },
        { title: "Best Sports Project", project: "Mismatch league" },
        { title: "Best International Service Project", project: "We fly together" },
      ],
      "Quarter 3": [
        { title: "Best Joint Project", project: "Dear" },
        { title: "Best Editorial Project", project: "The dadaist poem" },
        { title: "Best Social Media Project", project: "Polaroid souls" },
        { title: "Best PR Project", project: "Unity run a patriotic marathon" },
        { title: "Best International Service Project", project: "Spark against cancer" },
        { title: "Best Professional Development Project", project: "Indian youth parliament" },
        { title: "Best Community Service Project", project: "ArtEthics" },
      ],
      "Quarter 4": [
        { title: "Best Joint Project", project: "Panchdhara" },
        { title: "Best Editorial Project", project: "The lost manuscript Mafia" },
        { title: "Best Editorial Project", project: "Vibe and vision" },
        { title: "Best PIS Project", project: "Beyond burns" },
        { title: "Best Sports Project", project: "Serve and smash" },
        { title: "Best International Service Project", project: "Spanish day" },
      ],
      "Annual": [
        { title: "Best Impactful Project", project: "Sankalp Se Seva" },
        { title: "Best Club Service Project", project: "Midnight pedals ride through the city lights" },
        { title: "Best Club Service Project", project: "Khoj go Get E'M 4.0" },
      ],
    },
    individualNominations: [
      { title: "Best Editor", name: "Rtr. Nidhi Gupta" },
      { title: "Best Digital Communication Director", name: "Rtr. Parth Nalavde" },
      { title: "Best HRD", name: "Rtr. Shaziya Naz" },
      { title: "Best PIS Director", name: "Rtr. Diya Tilor" },
      { title: "Best RAYS Ambassador", name: "Rtr. Siddhi Sharma" },
      { title: "Best Entrepreneurship Development Director", name: "Rtr. Nisha Singh" },
      { title: "Best Marketing Director", name: "Rtr. Siddhi Sharma" },
      { title: "Best Sports Director", name: "Rtr. Preet Jain" },
      { title: "Best Community Service Director", name: "Rtr. Aaditi Pawar" },
      { title: "Best Community Service Director", name: "Rtr. Tiya Agarwal" },
      { title: "Best Vice President", name: "Rtr. Aaryan Gupta" },
      { title: "Best Vice President", name: "Rtr. Prathmesh Singh" },
      { title: "Best Chairperson Finance", name: "Rtr. Utsav Yadav" },
      { title: "Best Joint Secretary", name: "Rtr. Aditya Pandey" },
      { title: "Best Joint Secretary", name: "Rtr. Aachal Sharma" },
      { title: "Best President", name: "Rtr. Vaishnavi Ranjan" },
      { title: "Best Secretary", name: "Rtr. Aaditya Yadav" },
      { title: "Best President Secretary Relation", name: "Rtr. Vaishnavi Ranjan" },
      { title: "Best President Secretary Relation", name: "Rtr. Aaditya Yadav" },
    ],
    // Project wins — shows as large photo cards under Project Achievement
    projectAchievements: [
      { title: "Best Sports Project", desc: "Mismatch league", image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984891/Best_Project_sports_Mismatch_league_rzzz8s.jpg" },
      { title: "Best Flagship Project", desc: "Techworld", image: "https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984889/Best_Flagship_Project_techworld_jvcytz.jpg" },
    ],
  },
};
