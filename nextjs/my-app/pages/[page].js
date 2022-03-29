import Head from "next/head";
import {Button} from "primereact/button";
import {useState} from "react";

export default function Page({data}) {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const onLoadingClick1 = () => {
        setLoading1(true);

        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    }

    const onLoadingClick2 = (e) => {
        setLoading2(true);
        setTimeout(() => {
            setLoading2(false);

        }, 2000);
    }
    return (data && (
            <>
                <Head>
                    <title>{data.meta_data.seo_title}</title>
                    <meta name="description" content={data.meta_data.seo_desc}/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <article>
                    <h1>{data.post_title}</h1>
                    <img width={600} src={data.imgUrl} alt=""/>
                    {data.post_content && (
                        <div dangerouslySetInnerHTML={{__html: data.post_content}}>

                        </div>
                    )}

                    <Button label="Load more" loading={loading2} onClick={onLoadingClick2} />
                </article>
            </>
        )
    )
}

export const getStaticProps = async (context) => {
    const {page} = context.params;
    const postData = await fetch(`http://wordpress_next/wp-json/cms/v1/getPost?slug=${page}`)
    var data = await postData.json();


    const mediaId = data[0].meta_data._thumbnail_id;

    const mediaData = await fetch(`http://wordpress_next/wp-json/wp/v2/media/${mediaId}`)
    const media = await mediaData.json();
    const imgUrl = media.source_url;
    data[0] = {...data[0], imgUrl}

    return {
        props: {
            data: data[0]
        }
        , revalidate: 5
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`http://wordpress_next/wp-json/cms/v1/getPost`)
    const data = await res.json();

    const slugs = data.map((data) => data.post_name);

    const paths = slugs.map((slug) => ({params: {page: slug.toString()}}))
    return {
        paths,
        fallback: 'blocking'
    }
}
