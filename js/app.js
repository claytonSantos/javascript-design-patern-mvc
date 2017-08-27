
/* ======= Model ======= */

var model = {
		currentCat: null,
		controlAdminIsVisible: false,
		cats: [
				{
						clickCount : 0,
						name : 'Tabby',
						imgSrc : 'img/434164568_fea0ad4013_z.jpg',
						imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
				},
				{
						clickCount : 0,
						name : 'Tiger',
						imgSrc : 'img/4154543904_6e2428c421_z.jpg',
						imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
				},
				{
						clickCount : 0,
						name : 'Scaredy',
						imgSrc : 'img/22252709_010df3379e_z.jpg',
						imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
				},
				{
						clickCount : 0,
						name : 'Shadow',
						imgSrc : 'img/1413379559_412a540d29_z.jpg',
						imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
				},
				{
						clickCount : 0,
						name : 'Sleepy',
						imgSrc : 'img/9648464288_2516b35537_z.jpg',
						imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
				}
		]
};

var simpleValidator = {
	//isEmptyUndefineOrIsNull return true if value is equal null, undefined or ''

	isEmptyUndefineOrIsNull: function ( value ){
		value = value  || '';
		return value = value ? false : true;
	},

	 isNumeric: function ( value ) {
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

}

/* ======= Octopus ======= */

var octopus = {

		init: function() {
				// set our current cat to the first one in the list
				model.currentCat = model.cats[0];

				// tell our views to initialize
				catListView.init();
				catView.init();
				catAdminView.init();
		},

		getCurrentCat: function() {
				return model.currentCat;
		},

		getCats: function() {
				return model.cats;
		},

		// set the currently-selected cat to the object passed in
		setCurrentCat: function(cat) {
				model.currentCat = cat;
		},

		// increments the counter for the currently-selected cat
		incrementCounter: function() {
				model.currentCat.clickCount++;
				catView.render();
		},

		showAdminControls: function () {
			catAdminView.boxControls.classList.add("show");
			model.controlAdminIsVisible = true;
		},

		hideAdminControls: function () {
			catAdminView.boxControls.classList.remove("show");
			model.controlAdminIsVisible = false;
		},

		updateCat: function () {
			//verify if the filds aren't null, undefined or ''
			if( !simpleValidator.isEmptyUndefineOrIsNull(catAdminView.inputName.value) && 
					!simpleValidator.isEmptyUndefineOrIsNull(catAdminView.inputClicks.value) &&
					!simpleValidator.isEmptyUndefineOrIsNull(catAdminView.inputUrl.value) ) {
					let currentCat = model.currentCat;
					currentCat.name = catAdminView.inputName.value;
					currentCat.clickCount = simpleValidator.isNumeric(catAdminView.inputClicks.value) ? catAdminView.inputClicks.value : currentCat.clickCount;
					currentCat.imgSrc = catAdminView.inputUrl.value;
					catView.render();
					catListView.render();
					catAdminView.cleanfilds();
			}
		}
};


/* ======= View ======= */

var catView = {

		init: function() {
				// store pointers to our DOM elements for easy access later
				this.catElem = document.getElementById('cat');
				this.catNameElem = document.getElementById('cat-name');
				this.catImageElem = document.getElementById('cat-img');
				this.countElem = document.getElementById('cat-count');

				// on click, increment the current cat's counter
				this.catImageElem.addEventListener('click', function(){
						octopus.incrementCounter();
				});
				// render this view (update the DOM elements with the right values)
				this.render();
		},

		render: function() {
				// update the DOM elements with values from the current cat
				var currentCat = octopus.getCurrentCat();
				this.countElem.textContent = currentCat.clickCount;
				this.catNameElem.textContent = currentCat.name;
				this.catImageElem.src = currentCat.imgSrc;
		}
};

var catListView = {

		init: function() {
				// store the DOM element for easy access later
				this.catListElem = document.getElementById('cat-list');

				// render this view (update the DOM elements with the right values)
				this.render();
		},

		render: function() {
				var cat, elem, i;
				// get the cats we'll be rendering from the octopus
				var cats = octopus.getCats();

				// empty the cat list
				this.catListElem.innerHTML = '';

				// loop over the cats
				for (i = 0; i < cats.length; i++) {
						// this is the cat we're currently looping over
						cat = cats[i];

						// make a new cat list item and set its text
						elem = document.createElement('li');
						elem.classList.add("btn");
						elem.textContent = cat.name;

						// on click, setCurrentCat and render the catView
						// (this uses our closure-in-a-loop trick to connect the value
						//  of the cat variable to the click event function)
						elem.addEventListener('click', (function(catCopy) {
								return function() {
										octopus.setCurrentCat(catCopy);
										catView.render();
								};
						})(cat));

						// finally, add the element to the list
						this.catListElem.appendChild(elem);
				}
		}
};

var catAdminView = {

	init: function () {
		this.btnAdmin = document.querySelector(".btn-admin");
		this.boxControls = document.querySelector(".controls"); 
		this.inputName = document.querySelector(".controls-name");
		this.inputUrl = document.querySelector(".controls-url");
		this.inputClicks = document.querySelector(".controls-clicks");
		this.btnSave = document.querySelector(".btn-save");
		this.btnCancel = document.querySelector(".btn-cancel");

		this.btnAdmin.addEventListener('click', () => {
			octopus.showAdminControls();
		});
		this.btnCancel.addEventListener('click', () => {
			octopus.hideAdminControls();
		});
		this.btnSave.addEventListener('click', () => {
			octopus.updateCat();
		});
	},

	cleanfilds: function () {
		this.inputName.value = '';
		this.inputUrl.value = '';
		this.inputClicks.value = '';
	}
}
// make it go!
octopus.init();
