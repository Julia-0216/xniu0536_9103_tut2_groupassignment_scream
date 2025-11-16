# The Scream – Audio-Reactive Version

##  How to Interact
1. Open `index.html` in your browser and wait for everything to load.
2. Click the **Play / Pause** button in the top-left corner to start or stop the music.
3. Move your mouse across the screen:
   - **Up / Down** → controls volume  
   - **Left / Right** → controls audio panning  
4. As the soundtrack plays, randomly generated shapes will **scale and react** to the audio frequency data, creating a breathing and emotional rhythm on screen.

##  Individual Animation Approach
### Choice of Animation Driver
I used **audio (FFT + amplitude)** as the driver for my animation. The intention was to let the visuals react directly to sound-based emotional energy rather than physical actions, creating unstable and fluctuating movement that aligns with the psychological tension of *The Scream*.


### Animated Properties
I animated the **scale and visual presence** of randomly generated shapes that update in real time according to audio frequency values. These shapes are created through a **custom class** and repeatedly generated with a loop, forming an accumulating and chaotic visual texture that reflects anxiety and emotional overload.


### Inspiration
The muted **red-brown palette** was inspired by the distressed and painterly tones of Munch’s work, avoiding bright digital colours. I selected **Ligeti’s _Atmospheres_** for its atonal, unsettling sound qualities, which support a slow-building, tense emotional atmosphere.


### Technical Explanation
- **Shape class** used to define visual elements  
- **For-loop generation** to build layered density  
- **FFT scaling** using `spectrum[i] / 255`  
- **RMS amplitude** incorporated for intensity variation  
- **Custom red-brown colour mapping**  
- Built entirely with **p5.js techniques from the course**, without external libraries  


## References
- Munch, E. (1893). *The Scream.* National Museum, Oslo.  
- Ligeti, G. (1961). *Atmospheres.*  
- p5.js Reference — https://p5js.org/reference/  
