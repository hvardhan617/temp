import { useRouter } from "next/router";
import React from "react";

const Prod = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("product Data", data.data);
  return <div>{data.data._id}</div>;
};

export default Prod;

export async function getServerSideProps({ query: { id } }) {
  // Fetch data from external API
  console.log("server id", id);
  const res = await fetch(
    `https://staging-api.fibr.shop/product/pdp/products/${id}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

async function getServerData(id) {
  // let dev = 'https://myapi.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/product";
  let res = await fetch(`${staging}/pdp/products/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getBrandData(id) {
  // let dev = 'https://brands-api.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/brand";
  let res = await fetch(`${staging}/pdp/brand/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getCollectionData(id) {
  let staging = "https://staging-api.fibr.shop/product";

  let res = await fetch(`${staging}/pdp/product-groups/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getCampaignData(id) {
  // let dev = 'https://dev-brands.fibr.shop';
  let staging = "https://staging-api.fibr.shop/brand";

  let res = await fetch(`${staging}/pdp/campaign/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}
