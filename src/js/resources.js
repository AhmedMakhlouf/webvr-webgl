resorces = ['./Assets/ground.obj',
'./Assets/jungle.obj',
'./Assets/plants1.obj',
'./Assets/plants2.obj',
'./Assets/leaves.obj',
'./Assets/leaves1.obj',
'./Assets/canopies.obj']

resorces.forEach(r => {
    loadResource(r, function(modelErr, modelObj){
        if(modelErr){
            alert('Error loading object');
        } else {
            addModel(modelObj);
            update();
        }
    });
});


texture = loadTexture(gl, './Assets/environment.jpg');
  

