import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownloads from "../../components/AppDownloads/AppDownlods";

const Home = ({ user }) => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} user={user} /> {/* <-- pass user */}
      <AppDownloads />
    </div>
  );
};

export default Home;
