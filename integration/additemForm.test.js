describe('addItemForm', ()=>{
    it('base example, visually looks coorect', async ()=> {
        //API from jet-image-snapshot
        await page.goto('http://localhost:6006/iframe.html?id=additemforcomponent--add-item-form-base-example&viewMode=story');
        const image = await page.screenshot();


        expect(image).toMatchImageSnapshot();
    })
})