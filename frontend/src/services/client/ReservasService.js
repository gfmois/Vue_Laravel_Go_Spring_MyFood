import Api from "../Api";
import secret from "../../secret";

export default {
  getHolidays(params_info) {
    let params = Object.fromEntries(
      Object.keys(params_info).map((e) => [
        params_info[e].name.toLowerCase(),
        String(params_info[e].value).toLowerCase(),
      ])
    );

    return Api(`${secret.CLIENT_SERVER}`).get("/reservas/getBannedDays", {
      params,
    });
  },
  getPDFReserva(id_reserva) {
    return Api(`${secret.CLIENT_SERVER}`).get(`/reservas/pdf/${id_reserva}`)
  },
  getReserves() {
    return Api(`${secret.ADMIN_SERVER}`).get(`/reservas`)
  },
  saveReserva(reserva) {
    return Api(`${secret.CLIENT_SERVER}`).post("/reservas", reserva)
  }
};
