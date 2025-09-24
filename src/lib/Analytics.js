export const trackPage = ()=>{
    window.gtag('event','page_view',{
        page_path: url,
    })
}