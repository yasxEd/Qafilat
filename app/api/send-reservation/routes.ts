import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.json()

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Format reservation details for email
    const formatReservationDetails = (data: any) => {
      const { reservationSummary, personalInfo } = data

      // Format package type specific details
      let packageDetails = ""

      switch (reservationSummary.packageType) {
        case "hajj":
        case "umrah":
          packageDetails = `
            <p><strong>Type de forfait:</strong> ${reservationSummary.forfaitType}</p>
            <p><strong>Ville de départ:</strong> ${reservationSummary.departureCity}</p>
          `
          break
        case "hotel":
          packageDetails = `
            <p><strong>Destination:</strong> ${reservationSummary.destination}</p>
            <p><strong>Check-in:</strong> ${reservationSummary.dateFrom}</p>
            <p><strong>Check-out:</strong> ${reservationSummary.dateTo}</p>
            <p><strong>Chambres:</strong> ${reservationSummary.rooms}</p>
          `
          break
        case "vol":
          packageDetails = `
            <p><strong>Ville de départ:</strong> ${reservationSummary.departureCity}</p>
            <p><strong>Destination:</strong> ${reservationSummary.destination}</p>
            <p><strong>Type de vol:</strong> ${reservationSummary.tripDirection}</p>
            <p><strong>Classe:</strong> ${reservationSummary.flightClass}</p>
            <p><strong>Date de départ:</strong> ${reservationSummary.dateFrom}</p>
            ${reservationSummary.tripDirection === "round" ? `<p><strong>Date de retour:</strong> ${reservationSummary.dateTo}</p>` : ""}
          `
          break
        case "leisure":
          packageDetails = `
            <p><strong>Ville de départ:</strong> ${reservationSummary.departureCity}</p>
            <p><strong>Destination:</strong> ${reservationSummary.destination}</p>
            <p><strong>Type de voyage:</strong> ${reservationSummary.tripType}</p>
            <p><strong>Durée:</strong> ${reservationSummary.tripDuration}</p>
          `
          break
      }

      return `
        <h2>Nouvelle demande de réservation</h2>
        <h3>Détails de la réservation</h3>
        <p><strong>Type de voyage:</strong> ${reservationSummary.packageType}</p>
        ${packageDetails}
        <p><strong>Voyageurs:</strong> ${reservationSummary.adults} adulte(s), ${reservationSummary.children} enfant(s)</p>
        
        <h3>Coordonnées du client</h3>
        <p><strong>Nom:</strong> ${personalInfo.fullName}</p>
        <p><strong>Email:</strong> ${personalInfo.email}</p>
        <p><strong>Téléphone:</strong> ${personalInfo.phone}</p>
      `
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Qafilat Tayba Réservations" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nouvelle demande de réservation - ${formData.personalInfo.fullName}`,
      html: formatReservationDetails(formData),
    })

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
      messageId: info.messageId,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}
