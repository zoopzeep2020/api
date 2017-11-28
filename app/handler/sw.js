self.addEventListener('push',(event)=>{
    console.log('Pushed message',event)
    var title= 'Pushed';
    event.waitUntil(
        self.registration.showNotification(title,{
           body: 'a message',
           icon: '',
           tag: 'my-tag' 
        })
    )
})