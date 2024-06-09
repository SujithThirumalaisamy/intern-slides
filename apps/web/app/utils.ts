import axios from "axios";

export enum Category {
  "Important",
  "Spam",
  "Marketing",
  "Social",
  "General",
  "Promotions",
}

export type EmailType = {
  id: number;
  from: string;
  subject: string;
  body: string;
  date: string;
  category: Category;
  avatarSrc: string;
  avatarAlt: string;
  avatarInitials: string;
};

export async function getMailMetaList(gmailConfig: {
  includesSpamTrash: boolean;
  maxResults: number;
  pageToken: string;
  q: string;
}) {
  const { data: mailMetaList } = await axios.get("/", {
    params: gmailConfig,
  });
  return mailMetaList;
}

export async function getMail(mailId: string) {
  const { data: mailData } = await axios.get("/" + mailId);
  return mailData;
}

export function formatDateAsTime(date: string) {
  const dateObject = new Date(date);

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function getMailCategory(labelIds: string[]) {
  if (labelIds.includes("CATEGORY_PROMOTIONS")) {
    return Category.Promotions;
  } else if (labelIds.includes("IMPORTANT")) {
    return Category.Important;
  } else {
    return Category.General;
  }
}

const gmailConfig = {
  includesSpamTrash: true,
  maxResults: 10,
  pageToken: "",
  q: "",
};

export async function fetchMails(userData: {
  userId: string;
  accessToken: string;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      axios.defaults.baseURL = `https://gmail.googleapis.com/gmail/v1/users/${userData.userId}/messages`;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userData.accessToken;

      const { messages } = await getMailMetaList(gmailConfig);
      const mailsPromises = messages.map(async (message: any) => {
        const mail = await getMail(message.id);
        console.log(mail);

        const fromHeader = mail.payload.headers.find(
          (header: { name: string; value: string }) => header.name === "From"
        );
        const subjectHeader = mail.payload.headers.find(
          (header: { name: string; value: string }) => header.name === "Subject"
        );
        const dateHeader = mail.payload.headers.find(
          (header: { name: string; value: string }) => header.name === "Date"
        );
        const getInitial = (fromValue: string) => {
          const senderName = fromValue.split("<")[0];
          if (!senderName) return "U";
          const initial = senderName.split(" ");
          if (initial.length === 1) return initial[0]?.charAt(0);
          //@ts-ignore
          return initial[0]?.charAt(0) + initial[1]?.charAt(1);
        };
        const mailData = {
          id: mail.id.toString(),
          from: fromHeader ? fromHeader.value : "Unknown",
          subject: subjectHeader ? subjectHeader.value : "No Subject",
          body: mail.snippet.toString(),
          date: dateHeader ? dateHeader.value : "Unknown",
          category: getMailCategory(mail.labelIds),
          avatarSrc: "",
          avatarAlt: fromHeader ? fromHeader.value : "Unknown",
          avatarInitials: getInitial(
            fromHeader ? fromHeader.value : "Unknown"
          )?.toUpperCase(),
        };

        return mailData;
      });

      const messagesData: EmailType[] = await Promise.all(mailsPromises);
      resolve(messagesData);
    } catch (error) {
      reject(error);
    }
  });
}
