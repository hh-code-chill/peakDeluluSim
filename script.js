// Khởi tạo giá trị
const MAX_VALUE = 999999999999;
const ratio_table = {
  bet4: 50,
  bet5: 18,
  bet6: 14,
  bet7: 12,
  bet8: 8,
  bet9: 6,
  bet10: 6,
  bet11: 6,
  bet12: 6,
  bet13: 8,
  bet14: 12,
  bet15: 14,
  bet16: 18,
  bet17: 50,
  betstorm: 30,
};
const bets_table = {
  bet4: 0,
  bet5: 0,
  bet6: 0,
  bet7: 0,
  bet8: 0,
  bet9: 0,
  bet10: 0,
  bet11: 0,
  bet12: 0,
  bet13: 0,
  bet14: 0,
  bet15: 0,
  bet16: 0,
  bet17: 0,
  betstorm: 0,
};

let length_bets_table = Object.keys(bets_table).length;
let curren_bet_value = 0;
let total_bet = 0;
let betting_status = true;
let is_summary_results = false;
let winning_streak = 0;
let is_music_playing = false;

const all_buttons_chip = document.querySelectorAll(".bet-chip");
const dice_audio = document.getElementById("dice_audio");

// Hàm tắt bật cửa sổ popup với 1 nút mở, 1 nút tắt, 1pop-up
const hidden = (btn_on, btn_off, box) => {
  box.classList.toggle("hidden");
  btn_on.addEventListener("click", () => {
    box.classList.toggle("hidden");
  });
  btn_off.addEventListener("click", () => {
    box.classList.toggle("hidden");
  });
};

// Định dạng tiền tệ
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

// Khởi tạo
const initData = {
  game_mode_value: 0,
  cash: 0,
  total_debt: 0,
};

if (!localStorage.getItem("allData")) {
  localStorage.setItem("allData", JSON.stringify(initData));
  console.log("Khởi tạo thành công");
}

let gameData = JSON.parse(localStorage.getItem("allData"));
console.log(gameData);

// GAME MODE
const btnGM = document.getElementById("buttonGameMode");
const spanGM = btnGM.querySelector("span");

const modesGM = ["Chắc chứ?", "Thường thôi", "Gà con!"];
const iconsGM = [
  '<i class="fa-solid fa-skull-crossbones"></i>',
  '<i class="fa-solid fa-scale-unbalanced"></i>',
  '<i class="fa-solid fa-egg"></i>',
];

spanGM.innerHTML = `${iconsGM[gameData.game_mode_value]} ${modesGM[gameData.game_mode_value]}`;

btnGM.addEventListener("click", function () {
  gameData.game_mode_value = (gameData.game_mode_value + 1) % 3;
  localStorage.setItem("allData", JSON.stringify(gameData));
  spanGM.innerHTML = `${iconsGM[gameData.game_mode_value]} ${modesGM[gameData.game_mode_value]}`;
  console.log(`Game Mode hiện tại: ${gameData.game_mode_value}`);
});

// REINCARNATE

const btnReincarnate = document.getElementById("buttonReincarnate");
const boxReincarnate = document.getElementById("reincarnate__container");
const btnReincarnate_off = document.getElementById("reincarnate-off");
const btnReincarnate_on = document.getElementById("reincarnate-on");

btnReincarnate.addEventListener("click", () => {
  boxReincarnate.classList.toggle("hidden");
});

boxReincarnate.classList.toggle("hidden");

btnReincarnate_off.addEventListener("click", () => {
  boxReincarnate.classList.toggle("hidden");
});

btnReincarnate_on.addEventListener("click", () => {
  localStorage.clear();
  alert("Xóa nợ thành công! Vận đen sẽ sớm đến với bạn!!!");
  location.reload();
});

// PLAYGROUND CENTRAL
const span_total_bet = document.getElementById("val-total-bet");
const span_cash = document.getElementById("val-cash");
const span_debt = document.getElementById("val-debt");

span_total_bet.innerText = formatter.format(0);
span_cash.innerText = formatter.format(gameData.cash);
span_debt.innerText = formatter.format(gameData.total_debt);

// lend money
const button_lend_money = document.getElementById("btn-beg-money");
const button_lend_on = document.getElementById("confirm_lend_money");
const button_lend_off = document.getElementById("lend_money_off");
const form_lend_money = document.getElementById("lend_money");
const input_lend_money = document.getElementById("input_lend_money");

function uppdateWidth() {
  const textLength = input_lend_money.value.length;
  const placeholderLength = input_lend_money.placeholder.length;
  if (textLength > 0) {
    input_lend_money.style.width = textLength + 1 + "ch";
  } else {
    input_lend_money.style.width = placeholderLength + 1 + "ch";
  }
}

uppdateWidth();

input_lend_money.addEventListener("input", uppdateWidth);

// Chặn submit nếu dữ liệu sai (Phòng hờ trường hợp trình duyệt không hỗ trợ type="number")
form_lend_money.addEventListener("submit", (e) => {
  if (isNaN(input_lend_money.value) || input_lend_money.value === "") {
    e.preventDefault(); // Ngăn chặn gửi form
    alert("Vui lòng chỉ nhập số!");
  }
});

// nút nạp/vay tiền
button_lend_on.addEventListener("click", () => {
  let val_lend_money = parseInt(input_lend_money.value) || 0;
  if (val_lend_money < 0) val_lend_money = 0;
  gameData.cash += val_lend_money;
  gameData.total_debt += val_lend_money;

  if (gameData.cash > MAX_VALUE) gameData.cash = MAX_VALUE;
  if (gameData.total_debt > MAX_VALUE) gameData.total_debt = MAX_VALUE;

  localStorage.setItem("allData", JSON.stringify(gameData));

  span_cash.innerText = formatter.format(gameData.cash);
  span_debt.innerText = formatter.format(gameData.total_debt);
});

hidden(button_lend_money, button_lend_off, form_lend_money);

// ============================================================
// Đồng hồ clock
const TIME_BET = 30;
const TIME_RESULT = 10;
const TIME_PREPARE = 5;

let curren_phase = 1; //1: Cược, 2: Kết quả, 3: Chuẩn bị
let time_left = TIME_BET;
let time_pointer = null;
let isRunning = true;

const span_countdown = document.getElementById("time-countdown");
const button_countdown = document.getElementById("button-countdown");
const button_dice_plate = document.getElementById("dice-plate");
const bowl = document.getElementById("bowl");

//hàm cập nhập giao diện đồng hồ và trạng thái của đĩa sóc
function update_UI_clock() {
  span_countdown.innerText = time_left;

  if (curren_phase === 1) {
    span_countdown.style.color = "red";
    button_dice_plate.disabled = true;

    bowl.classList.add("locked");
    bowl.classList.remove("opened");
  } else if (curren_phase === 2) {
    span_countdown.style.color = "green";
    button_dice_plate.disabled = false;

    bowl.classList.remove("locked");
  } else if (curren_phase === 3) {
    span_countdown.style.color = "var(--copy)";
    button_dice_plate.disabled = true;
  }
}

// hàm đếm ngược của đồng hồ
function start_clock() {
  time_pointer = setInterval(() => {
    time_left--;

    if (time_left < 0) {
      if (curren_phase === 1) {
        curren_phase = 2;
        time_left = TIME_RESULT;

        is_summary_results = true;

        if (is_music_playing === true) {
          dice_audio.currentTime = 0;
          dice_audio.play();
        }
      } else if (curren_phase === 2) {
        curren_phase = 3;
        time_left = TIME_PREPARE;

        bowl.classList.add("opened");
        summary_results(gameData.game_mode_value);
      } else if (curren_phase === 3) {
        curren_phase = 1;
        time_left = TIME_BET;

        //reset lại dữ liệu chuẩn bị cho phiên cược mới
        for (let i = 0; i < length_bets_table - 1; i++) {
          bets_table[`bet${i + 4}`] = 0;
        }
        bets_table["betstorm"] = 0;

        for (let i = 0; i < length_bets_table - 1; i++) {
          let span_element = document.getElementById(`val-bet-${i + 4}`);
          span_element.innerText = "";
        }
        document.getElementById("val-bet-storm").innerText = 0;

        total_bet = 0;
        span_total_bet.innerText = 0;

        console.log("Bàn cược mới!");
      }
    }

    update_UI_clock();
  }, 1000);
}

start_clock();

// bắt sự kiện tạm dừng
button_countdown.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(time_pointer);
    span_countdown.innerText = "Resume";
  } else {
    start_clock();
  }
  isRunning = !isRunning;
});

// người chơi tự mở kết quả
button_dice_plate.addEventListener("click", () => {
  if (curren_phase === 2) {
    bowl.classList.add("opened");
    button_dice_plate.disabled = true;

    summary_results(gameData.game_mode_value);
  }
});

// ============================================================
// Xử lý nút đặt cược
const button_betting_status = document.getElementById("btn-toggle-bet");
const span_betting_status = document.getElementById("text-toggle-bet");

button_betting_status.addEventListener("click", () => {
  if (betting_status) {
    betting_status = false;
    span_betting_status.innerText = "Hủy";
    span_betting_status.style.color = "red";
  } else {
    betting_status = true;
    span_betting_status.innerText = "Cược";
    span_betting_status.style.color = "black";
  }
});

// xử lý các nút giá trị đặt cược
all_buttons_chip.forEach((button_chip) => {
  button_chip.addEventListener("click", function () {
    all_buttons_chip.forEach((btn) => {
      btn.style.color = "black";
    });
    this.style.color = "red";

    curren_bet_value = parseInt(this.dataset.val);
  });
});

// xử lý các ô đặt cược
const all_buttons_bet = document.querySelectorAll(".playground_central__bets");

all_buttons_bet.forEach((btn_bet) => {
  btn_bet.addEventListener("click", function () {
    if (curren_phase === 1) {
      let bet_number = this.getAttribute("data-bet");
      let span_element = document.getElementById(`val-bet-${bet_number}`);

      if (betting_status === true) {
        if (total_bet + curren_bet_value > gameData.cash) {
          alert("Không đủ tiền cược! Hãy tìm thần tài để tiếp tục chơi!");
        } else {
          total_bet += curren_bet_value;
          bets_table[`bet${bet_number}`] += curren_bet_value;

          span_total_bet.innerText = formatter.format(total_bet);
          span_element.innerText = bets_table[`bet${bet_number}`] / 1000;
        }
      } else {
        if (bets_table[`bet${bet_number}`] < curren_bet_value) {
          total_bet -= bets_table[`bet${bet_number}`];
          bets_table[`bet${bet_number}`] = 0;

          span_total_bet.innerText = formatter.format(total_bet);
          span_element.innerText = bets_table[`bet${bet_number}`] / 1000;
        } else {
          total_bet -= curren_bet_value;
          bets_table[`bet${bet_number}`] -= curren_bet_value;

          span_total_bet.innerText = formatter.format(total_bet);
          span_element.innerText = bets_table[`bet${bet_number}`] / 1000;
        }
      }
    }
  });
});

// ============================================================
// Thuật toán random cho 3 chế độ
let number_of_wins = 0;

//hàm random từ 1 đến 6 mặc định
function random_die() {
  return Math.floor(Math.random() * 6);
}

function random_basic() {
  return [random_die(), random_die(), random_die()];
}

const list_dices = [
  '<i class="fa-solid fa-dice-one"></i>',
  '<i class="fa-solid fa-dice-two"></i>',
  '<i class="fa-solid fa-dice-three"></i>',
  '<i class="fa-solid fa-dice-four"></i>',
  '<i class="fa-solid fa-dice-five"></i>',
  '<i class="fa-solid fa-dice-six"></i>',
];

//Cho ra kết quả, tổng kết thắng, thua, hiển thị kết quả
const span_noti_result_3dice = document.getElementById("noti_result_3dice");
const span_noti_total_result = document.getElementById("noti_total_result");
const span_noti_result_bigsmall = document.getElementById(
  "noti_result_bigsmall",
);
const div_noti_log_result = document.getElementById("noti_log_result");

function update_notification(content, color = "black") {
  const new_noti = document.createElement("span");
  new_noti.innerText = content;
  new_noti.style.color = color;
  div_noti_log_result.appendChild(new_noti);
  div_noti_log_result.scrollTop = div_noti_log_result.scrollHeight;
}

function summary_results(gm) {
  if (is_summary_results) {
    // sử lý kết quả theo gm-game mode
    let result_3dice = [];
    if (gm === 0) {
      if (winning_streak > 3 && bets_table["betstorm"] === 0) {
        let temp = random_die();
        result_3dice = [temp, temp, temp];
        winning_streak = 0;
      } else {
        result_3dice = random_basic();
      }
    } else if (gm === 1) {
      result_3dice = random_basic();
    } else if (gm === 2) {
      if (bets_table["betstorm"] > 0) {
        let temp = random_die();
        result_3dice = [temp, temp, temp];
      } else {
        result_3dice = random_basic();
      }
    }
    //hiển thị kết quả
    for (let i = 0; i < 3; i++) {
      const span_dice = document.getElementById(`die-${i}`);
      span_dice.innerHTML = list_dices[result_3dice[i]];
    }

    let result_total_point = result_3dice.reduce(
      (sun, point) => sun + point + 1,
      0,
    );
    let is_storm =
      result_3dice[0] === result_3dice[1] &&
      result_3dice[1] === result_3dice[2];

    span_noti_result_3dice.innerHTML = `${result_3dice[0] + 1} ${result_3dice[1] + 1} ${result_3dice[2] + 1}`;
    span_noti_total_result.innerText = result_total_point;
    let span_noti_result_bigsmall_message = "";
    if (is_storm) {
      span_noti_result_bigsmall_message = "Bão";
    } else if (10 < result_total_point && result_total_point < 18) {
      span_noti_result_bigsmall_message = "Tài";
    } else if (3 < result_total_point && result_total_point < 11) {
      span_noti_result_bigsmall_message = "Xỉu";
    }
    span_noti_result_bigsmall.innerText = span_noti_result_bigsmall_message;
    //tổng kết kết quả vào tiền mặt và tổng nợ;
    let keys = Object.keys(bets_table);
    let values = Object.values(bets_table);
    let interest_total_log = 0;
    for (let i = 0; i < length_bets_table; i++) {
      let curren_key = keys[i];
      let curren_value = values[i];
      let interest = 0;
      if (
        (curren_value > 0 &&
          curren_key === `bet${result_total_point}` &&
          !is_storm) ||
        (curren_value > 0 && curren_key === "betstorm" && is_storm)
      ) {
        //TH thắng không bão hoặc cược bão thắng
        interest = curren_value * ratio_table[curren_key];
        if (gameData.total_debt > 0) {
          if (gameData.total_debt < interest) {
            gameData.cash = gameData.cash + interest - gameData.total_debt;
            gameData.total_debt = 0;
          } else {
            gameData.total_debt -= interest;
          }
        } else {
          gameData.cash += interest;
        }

        interest_total_log += interest;
        update_notification(
          `!${curren_key} cược ${curren_value} thắng ${interest}`,
          "green",
        );

        winning_streak++;
        console.log(winning_streak);
      } else if (curren_value > 0) {
        //TH thua
        interest = -curren_value;
        gameData.cash -= curren_value;

        interest_total_log += interest;
        update_notification(
          `!${curren_key} cược ${curren_value} mất ${interest}`,
        );
      }
    }

    //lưu lại kết quả
    localStorage.setItem("allData", JSON.stringify(gameData));

    //Cập nhập lại tiền mặt và tổng nợ
    span_cash.innerText = formatter.format(gameData.cash);
    span_debt.innerText = formatter.format(gameData.total_debt);

    update_notification(`!Tổng phiên: ${interest_total_log}`, "red");
  }
  is_summary_results = false;
}

//âm thanh nền
const bg_audio = document.getElementById("bg_audio");
const button_toggle_music = document.getElementById("button_toggle_music");

bg_audio.volume = 0.5;
dice_audio.volume = 1;

button_toggle_music.addEventListener("click", () => {
  if (is_music_playing === false) {
    bg_audio.play();
    button_toggle_music.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> Not sound`;
    is_music_playing = true;
  } else {
    bg_audio.pause();
    button_toggle_music.innerHTML = `<i class="fa-solid fa-volume-high"></i> Sound`;
    is_music_playing = false;
  }
});
