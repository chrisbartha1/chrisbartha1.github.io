

function hit() {
    const cards = Array.from(document.querySelectorAll(".card"));
    cards.forEach(card => card.addEventListener("click", card2));

    const cards2 = Array.from(document.querySelectorAll(".card2"));
    cards2.forEach(cards => cards.addEventListener("click", card2));

    num_pad();
}

let data_index = "0";
let data_index_2 = "0";

let MAX = 9,
    BLANK = 0,
    row = 0,
    col = 0;

let grid =    [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];

const classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

let pair = [0, 0];

function num_pad() {
    let index = 0;
    classes.forEach(num_key => document.getElementsByClassName("card2").item(index++).classList.add(num_key));
}

function add_class(num) {
    document.getElementsByClassName("card").item(data_index-1).classList.add(classes[num-1]);
}

function fill_grid() {
    let i = 0;
    grid.forEach(row => row.forEach(col => document.getElementsByClassName("card").item(i++).classList.add(classes[col-1])));
}

window.addEventListener("load", hit);

function remove() {
    let key_at_place = document.getElementsByClassName("card").item(data_index-1).classList;

    classes.forEach(num_class => {
        if(key_at_place.contains(num_class)) {
            key_at_place.remove(num_class);
        }
    });
}

function card2() {
    if(this.classList.contains("card")) {
        data_index = Number(this.dataset.index);
    } else if(this.classList.contains("card2")) {
        data_index_2 = Number(this.dataset.index);
        add_class(data_index_2);

        row = Math.floor((data_index - 1)/9);
        col = (data_index-1) % 9;
        if(is_safe(grid, row, col, data_index_2)) {
            remove();
            document.getElementsByClassName("card").item(data_index-1).classList.remove("red");
            /*grid[row][col] = Number(data_index_2);
            add_class(data_index_2);
            
            document.getElementsByClassName("card").classList.remove("red");
            document.getElementsByClassName("card2").classList.remove("red");
            
            
            
            let card2 = document.getElementsByClassName("card2").classList;
            card2.forEach(num_pad => {
                if(num_pad.contains("red")) {
                    num_pad.remove("red");
                }
            });*/
            grid[row][col] = Number(data_index_2);
            add_class(data_index_2);
        } else {
            document.getElementsByClassName("card").item(data_index-1).classList.toggle("red", true);
        }
    }
}

function reset() {
    if(Number.isInteger(data_index)) {
        document.getElementsByClassName("card").item(data_index-1).classList.remove("red");
    }
    let i = 0;
    grid.forEach(row => row.forEach(col => document.getElementsByClassName("card").item(i++).classList.remove(classes[col-1])));

    grid =    [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ];
}

function run_solver() {
    if(Number.isInteger(data_index)) {
        document.getElementsByClassName("card").item(data_index-1).classList.remove("red");
    }

    if(solve(grid)) {
        fill_grid();
        console.log(grid);
    } else {
        console.log("No solution exists for the given Sudoku");
    }


    console.log(document);
}

function used_in_row(grid, row, num) {
    for(let col = 0; col < MAX; col++) {
        if(grid[row][col] === num) {
            return true;
        }
    }

    return false;
}

function used_in_col(grid, col, num) {
    for(let row = 0; row < MAX; row++) {
        if(grid[row][col] === num) {
            return true;
        }
    }

    return false;
}

function used_in_box(grid, box_start_row, box_start_col, num) {
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(grid[row + box_start_row][col + box_start_col] === num) {
                return true;
            }
        }
    }
    return false;
}

function is_safe(grid, row, col, num) {
    return  !used_in_row(grid, row, num) &&
        !used_in_col(grid, col, num) &&
        !used_in_box(grid, row - row % 3, col - col % 3, num);
}

function get_unassigned_location(grid) {
    for (let row = 0; row < MAX; row++) {
        for (let col = 0; col < MAX; col++) {
            if (grid[row][col] === BLANK) {
                pair[0] = row;
                pair[1] = [col];
                return pair;
            }
        }
    }

    return "GRID_FULL";
}

function solve(grid) {
    if ("GRID_FULL" === get_unassigned_location(grid)) {
        return true;
    }

    pair = get_unassigned_location(grid);
    let row = pair[0];
    let col = pair[1];

    for (let num = 1; num <= 9; num++) {
        if (is_safe(grid, row, col, num)) {

            grid[row][col] = num;
            if (solve(grid)) { return true; }
            grid[row][col] = BLANK;
        }
    }
    return false;
}


