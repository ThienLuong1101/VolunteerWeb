Vue.component('app-opportunities', {
    template: `
    <div class="contentWord">
        <p class="word" >Volunteer Organization:</p>

        <div class="gallery">
        <a target="_blank" href="images/An.jpg">
        <img class="image" src="images/An.jpg" alt="Cinque Terre" width="600" height="400">
        </a>
        <div class="desc">An</div>
        </div>

        <div class="gallery">
        <a target="_blank" href="images/Tien.jpg">
        <img class="image" src="images/Tien.jpg" alt="Cinque Terre" width="600" height="400">
        </a>
        <div class="desc">Tien</div>
        </div>

        <div class="gallery">
        <a target="_blank" href="images/Tai.jpg">
        <img class="image" src="images/Tai.jpg" alt="Cinque Terre" width="600" height="400">
        </a>
        <div class="desc">Tai</div>
        </div>

        <div class="gallery">
        <a target="_blank" href="images/Edgar.jpg">
        <img class="image" src="images/Edgar.jpg" alt="Cinque Terre" width="600" height="400">
        </a>
        <div class="desc">Edgar</div>
        </div>

    </div>

        `,
    data() {
        return {
            open: true
        };
    },
    methods: {
        handleClick() {
            this.open = !this.open; // Toggle the visibility of other elements
        }
    }
});
