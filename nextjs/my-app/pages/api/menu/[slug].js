export default async function handler({query: {slug}}, response) {
    const res = await fetch(`http://wordpress_next/wp-json/cms/v1/getMenu?slug=${slug}`);

    const data = await res.json();

    response.status(200).json(data)
}