let txtAreas = document.querySelectorAll('#autoTxtArea');
for(x=0;x<txtAreas.length;x++){
   txtAreas[x].addEventListener('input', function(){
        if(this.scrollHeight > this.offsetHeight) this.rows += 1;
   });
}