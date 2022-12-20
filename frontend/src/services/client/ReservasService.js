import Api from "../Api";
import secret from "../../secret";

export default {
  getHolidays(params_info) {
    console.log(params_info);

    let params = Array.isArray(params_info)
      ? Object.fromEntries(
          Object.keys(params_info).map((e) => [
            params_info[e].name.toLowerCase(),
            String(params_info[e].value).toLowerCase(),
          ])
        )
      : params_info;

    return Api(`${secret.CLIENT_SERVER}`).get("/reservas/getBannedDays", {
      params,
    });
  },
  getPDFReserva(id_reserva) {
    return Api(`${secret.CLIENT_SERVER}`).get(`/reservas/pdf/${id_reserva}`);
  },
  getReserves() {
    return Api(`${secret.ADMIN_SERVER}`).get(`/reservas`);
  },
  getReserve(id_reserva) {
    return Api(`${secret.ADMIN_SERVER}`).get(`/reservas/${id_reserva}`)
  },
  saveReserva(reserva) {
    return Api(`${secret.CLIENT_SERVER}`).post("/reservas", reserva);
  },
  saveReservaAdmin(reserva) {
    return Api(`${secret.ADMIN_SERVER}`).post("/reservas", reserva);
  },
  updateReserveAdmin(reserva) {
    return Api(`${secret.ADMIN_SERVER}`).post('/reservas/update', reserva);
  }
};
