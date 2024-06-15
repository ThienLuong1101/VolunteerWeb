Vue.component('app-organization', {
    template: `
    <div class="contentWord">
        <div class="table-activity">
            <table>
                <tr>
                    <th>Organization</th>
                    <th>Activity</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>YouX</td>
                    <td>CareerExpo</td>
                    <td>7:00 am 30/02/2025</td>
                </tr>
                <tr>
                    <td>YouX</td>
                    <td>Orientation Week</td>
                    <td>12:00 am 04/14/2024</td>
                </tr>
            </table>
        </div>
        <p class="word" >You are member of:</p>
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
